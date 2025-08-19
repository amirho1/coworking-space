import { routes } from "@/lib/utils";
import { redirect } from "@/middleware";
import { decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";

const adminRoutes = [routes.users];

export default function authorization(req: NextRequest) {
  if (adminRoutes.includes(req.nextUrl.pathname)) {
    const auth = req.cookies.get("Authorization");
    const data = decodeJwt(auth?.value as string);

    if (data.role === "Admin") return NextResponse.next();
    else return redirect(routes.services, req);
  }

  /* --- 6. All good ------------------------------------------------ */
  return NextResponse.next();
}
