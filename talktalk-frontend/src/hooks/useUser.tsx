import { useState, useEffect } from "react";

// Define the User type
interface User {
  id: number;
  name: string;
  email: string;
}

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/user/profile/", {
      credentials: "include", // Include cookies for Django session-based auth
      redirect: "manual",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setLoading(false);
      });
  }, []);

  return { user, loading };
}


