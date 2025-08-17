import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../Pages/Shared/Logo/Logo';
import Lottie from 'lottie-react';
import loginAnimation from "../assets/lottie/login.json";
import DynamicTitle from '../Pages/Shared/pageTitle/DynamicTitle';
const AuthLayout = () => {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-base-100">
        {/* Left Side - Logo + Image or Lottie */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-primary text-primary-content p-6 space-y-6">
          {/* Logo at top */}
          <div className="w-full flex justify-start">
            <Logo color="text-white" />
          </div>

          {/* Main content - centered */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <Lottie
              animationData={loginAnimation}
              loop
              className="max-w-md w-full"
            />
          </div>
        </div>

        {/* Right Side - Login Component */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <DynamicTitle />
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default AuthLayout;