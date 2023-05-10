"use client";

import { useSupabase } from "../app/supabase-provider";
import { Button } from "./ui/button";

export const LoginButton = () => {
  const { supabase } = useSupabase();

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: "nicolaschartiot@gmail.com",
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    console.log({ data, error });
  }

  return <Button onClick={signInWithEmail}>Login</Button>;
};
