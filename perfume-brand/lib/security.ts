import { randomBytes } from "crypto";

const CSRF_STORE = new Map<string, number>();
const CSRF_TTL = 3600_000;

setInterval(() => {
  const now = Date.now();
  for (const [token, ts] of CSRF_STORE) {
    if (now - ts > CSRF_TTL) CSRF_STORE.delete(token);
  }
}, 300_000);

export function generateCsrfToken(): string {
  const token = randomBytes(32).toString("hex");
  CSRF_STORE.set(token, Date.now());
  return token;
}

export function validateCsrfToken(token: string | null): boolean {
  if (!token) return false;
  const ts = CSRF_STORE.get(token);
  if (!ts) return false;
  if (Date.now() - ts > CSRF_TTL) {
    CSRF_STORE.delete(token);
    return false;
  }
  CSRF_STORE.delete(token);
  return true;
}

export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message: string;
};

export function validateField(value: string, rules: ValidationRule[]): string | null {
  for (const rule of rules) {
    if (rule.required && !value.trim()) return rule.message;
    if (rule.minLength && value.length < rule.minLength) return rule.message;
    if (rule.maxLength && value.length > rule.maxLength) return rule.message;
    if (rule.pattern && !rule.pattern.test(value)) return rule.message;
  }
  return null;
}

export const validationRules = {
  email: [
    { required: true, message: "Email is required" },
    { maxLength: 254, message: "Email is too long" },
    {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email format",
    },
  ] as ValidationRule[],
  password: [
    { required: true, message: "Password is required" },
    { minLength: 8, message: "Password must be at least 8 characters" },
    { maxLength: 128, message: "Password is too long" },
  ] as ValidationRule[],
  name: [
    { required: true, message: "Name is required" },
    { minLength: 1, message: "Name cannot be empty" },
    { maxLength: 100, message: "Name is too long" },
  ] as ValidationRule[],
};

export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export function sanitizeUrl(input: string): string {
  const allowed = /^(https?:|mailto:|tel:)/;
  const cleaned = input.trim().replace(/[<>"'\\]/g, "");
  if (!allowed.test(cleaned)) return "";
  return cleaned;
}
