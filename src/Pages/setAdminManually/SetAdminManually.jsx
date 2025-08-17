
import { useEffect } from "react";

const SetAdminManually = () => {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "emiliyalamia@gmail.com",
        name: "Emiliya Lamia",
        photo:
          "https://lh3.googleusercontent.com/a/ACg8ocICI6GHx0yroV19vjLfiCa7z8_vJbR4M0K0tdQH9aG8f-LbSw=s96-c",
        role: "admin",
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("✅ Admin set:", data))
      .catch((err) => console.error("❌ Failed to set admin:", err));
  }, []);

  return <div>Setting admin...</div>;
};

export default SetAdminManually;
