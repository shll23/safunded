import { NextResponse } from "next/server";

const PAYOUTS_PASSWORD = "Admin123";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  if (password !== PAYOUTS_PASSWORD) {
    return NextResponse.json(
      { ok: false, message: "Das Passwort ist nicht korrekt." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("safunded_payouts_access", "granted", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
