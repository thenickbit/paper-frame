"use client";

import { useState } from "react";
import { useSupabase } from "../app/supabase-provider";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const LoginForm = () => {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    console.log({ data, error });
  }

  return (
    <div>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={signInWithEmail}>Login</Button>
    </div>
  );
};
