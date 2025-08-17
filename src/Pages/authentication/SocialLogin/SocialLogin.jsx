import { useNavigate, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useLoading } from "../../../hooks/useLoading";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import useAxios from "../../../hooks/useAxios";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosInstance = useAxios();

  const handleGoogleLogin = () => {
    setLoading(true);
    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        // ✅ Use PUT to upsert user info
        try {
          const res = await axiosInstance.put(`/users/${user.email}`, userInfo);
          console.log("✅ User upserted via Google login:", res.data);
        } catch (err) {
          console.error("❌ Error upserting Google user to DB:", err);
        }

        toast.success("Logged in with Google!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Google Login Failed:", error.message);
        toast.error("Google login failed!");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div className="divider">or</div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="btn btn-outline text-base sm:text-lg btn-primary w-full"
      >
        <FcGoogle className="w-5 h-5 mr-2" />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
