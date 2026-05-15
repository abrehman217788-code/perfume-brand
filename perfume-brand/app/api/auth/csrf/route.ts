import { NextResponse } from "next/server";
import { generateCsrfToken } from "@/lib/security";

export async function GET() {
  const csrfToken = generateCsrfToken();
  return NextResponse.json({ csrfToken });
}
