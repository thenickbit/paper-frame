"use client";

import { useSupabase } from "@/app/supabase-provider";

export const LogoutButton = () => {
  const { supabase } = useSupabase();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    console.log({ error });
  };

  return (
    <button
      onClick={signOut}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};
