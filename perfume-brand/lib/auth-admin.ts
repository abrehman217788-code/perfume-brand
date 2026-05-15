import jwt from "jsonwebtoken";

export async function verifyAdmin(request: Request): Promise<boolean> {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const token = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("auth-token="))
      ?.split("=")[1];
    if (!token) return false;
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret") as { role?: string };
    return decoded.role === "admin";
  } catch {
    return false;
  }
}
