"use client";

import { useSupabase } from "../app/supabase-provider";

export const LoginButton = () => {
  const { supabase } = useSupabase();

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: "nicolaschartiot@gmail.com",
      options: {
        emailRedirectTo: "http://localhost:3000",
      },
    });

    console.log({ data, error });
  }

  return (
    <button
      onClick={signInWithEmail}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Login
    </button>
  );
};
