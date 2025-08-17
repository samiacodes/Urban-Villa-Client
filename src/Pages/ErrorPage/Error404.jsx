import Lottie from "lottie-react";
import error404 from "../../assets/lottie/error404.json";

const Error404 = () => {
  return (
    <div className="h-screen bg-secondary flex justify-center items-center text-center">
      <div>
        <p className="text-2xl mt-2">Page Not Found</p>
        <Lottie
          animationData={error404}
          loop
          className="max-w-md w-full"
        />
        <a href="/" className="text-Primary text-2xl underline mt-4 block">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default Error404;
