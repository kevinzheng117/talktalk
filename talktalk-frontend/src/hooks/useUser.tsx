<<<<<<< HEAD
"use client";
=======
"use client"
>>>>>>> 28bdacc3c48143916067aa8270c23a6342bc63d8

import { useSession } from "next-auth/react";

const useUser = () => {
  const { data: session, status } = useSession();

  // Return the user data, loading state, and any error
  return {
    user: session?.user,
    isLoading: status === "loading",
    error: session?.error || null,
  };
};

export default useUser;
