"use client"

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
