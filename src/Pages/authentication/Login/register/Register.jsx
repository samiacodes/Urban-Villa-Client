import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../../SocialLogin/SocialLogin";
import toast from "react-hot-toast";
const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();

  const [uploading, setUploading] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  // Image Upload Handler
  const handleImageUpload = async (e) => {
    setUploading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const uploadURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    try {
      const res = await axios.post(uploadURL, formData);
      setProfilePic(res.data.data.url);
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  // Form Submit Handler
  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      const firebaseUser = result.user;
      console.log(firebaseUser)
      // Update Firebase profile
      await updateUserProfile({
        displayName: `${data.firstName} ${data.lastName}`,
        photoURL: profilePic,
      });

      // Prepare user info for backend
      const userInfo = {
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        role: "user",
        photoURL: profilePic,
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      // Save to DB
      await fetch(`${import.meta.env.VITE_API_URL}/users/${data.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      // ✅ Success message & redirect
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="card shadow-xl bg-base-200 p-6 max-w-xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">First Name</label>
            <input
              {...register("firstName", { required: "Required" })}
              className="input input-bordered w-full"
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="label">Last Name</label>
            <input
              {...register("lastName")}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: "Required" })}
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters required",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                message:
                  "Must have at least 1 uppercase and 1 lowercase letter",
              },
            })}
            className="input input-bordered w-full"
          />
          <small className="text-gray-400">
            Must include uppercase and lowercase letters
          </small>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="label">Profile Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />
          {uploading && <p className="text-blue-500">Uploading...</p>}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-2"
          disabled={uploading}
        >
          {uploading ? "Please wait..." : "Register"}
        </button>

        <SocialLogin />

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
