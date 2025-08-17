import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/users/role/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRole(data.role);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("❌ Failed to fetch role:", err);
          setIsLoading(false);
        });
    }
  }, [user]);

  return { role, isLoading };
};

export default useRole;
