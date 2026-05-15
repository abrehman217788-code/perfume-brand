import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateCsrfToken, validateField, validationRules } from "@/lib/security";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-production-32chars";
const SALT_ROUNDS = 12;

const users = new Map<string, { passwordHash: string; name: string }>();

export async function POST(request: Request) {
  const csrfToken = request.headers.get("x-csrf-token");
  if (!validateCsrfToken(csrfToken)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }

  let body: { name?: string; email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, email, password } = body;

  const nameError = validateField(name || "", validationRules.name);
  if (nameError) return NextResponse.json({ error: nameError }, { status: 400 });

  const emailError = validateField(email || "", validationRules.email);
  if (emailError) return NextResponse.json({ error: emailError }, { status: 400 });

  const passwordError = validateField(password || "", validationRules.password);
  if (passwordError) return NextResponse.json({ error: passwordError }, { status: 400 });

  if (users.has(email!.toLowerCase())) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password!, SALT_ROUNDS);
  users.set(email!.toLowerCase(), { passwordHash, name: name! });

  const token = jwt.sign(
    { email: email!.toLowerCase(), name },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { email: email!.toLowerCase(), type: "refresh" },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  const response = NextResponse.json({
    user: { name, email },
    token,
    refreshToken,
  });

  response.cookies.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 900,
  });

  response.cookies.set("refresh-token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth",
    maxAge: 604_800,
  });

  return response;
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 204 });
}
