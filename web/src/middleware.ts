import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

import { env } from "@/env.mjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient<Database>({ req, res });
  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (req.nextUrl.pathname.startsWith("/gallery")) {
    if (user?.email && env.AUTHORIZED_EMAILS?.includes(user.email)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect("http://localhost:3000/unauthorized");
    }
  }

  return res;
}
