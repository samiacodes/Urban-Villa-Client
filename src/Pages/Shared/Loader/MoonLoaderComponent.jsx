// src/Shared/MoonLoaderComponent.jsx

import Lottie from "lottie-react";
import loginAnimation from "../../../assets/lottie/loading";

const MoonLoaderComponent = () => {
  return (
    <div className="fixed inset-0 bg-primary bg-opacity-80 flex flex-col items-center justify-center z-[9999]">
      <Lottie animationData={loginAnimation} loop className="max-w-md w-full" />
    </div>
  );
};

export default MoonLoaderComponent;
