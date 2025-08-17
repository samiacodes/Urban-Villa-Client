import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { toast } from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues, // ✅ ADD THIS!
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  // ✅ Reset Password Handler
  const handleResetPassword = () => {
    const email = getValues("email"); // ✅ get current email value
    if (!email) {
      toast.error("Please enter your email to reset password.");
      return;
    }

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset link sent to your email.");
      })
      .catch((error) => {
        toast.error("Failed to send reset link.");
        console.error(error);
      });
  };

  // ✅ Login Handler
  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log("Logged in user:", result.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
        toast.error("Login failed. Check your credentials.");
      });
  };

  return (
    <div className="card shadow-xl bg-base-200 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card bg-base-200 p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {/* Email Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Email</span>
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full"
          />
          {errors.email && (
            <span className="text-error text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Password</span>
          </label>
          <input
            type="password"
            placeholder="••••••••"
            {...register("password", { required: "Password is required" })}
            className="input input-bordered w-full"
          />
          {errors.password && (
            <span className="text-error text-sm mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* ✅ Forgot Password */}
        <p
          className="text-sm text-center mt-2 text-primary hover:underline cursor-pointer"
          onClick={handleResetPassword}
        >
          Forgot Password?
        </p>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full mt-2">
          Login
        </button>

        {/* Social Login */}
        <SocialLogin />

        {/* Register Link */}
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
