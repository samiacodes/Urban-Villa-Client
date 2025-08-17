// src/Pages/dashboard/MakePayment.jsx
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PaymentForm from "./PaymentForm";
import Loader from "../../Shared/Loader/Loader";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const MakePayment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: agreement = {}, isLoading } = useQuery({
    queryKey: ["agreement", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loader/>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Make Payment</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Floor:</strong> {agreement.floor}
        </p>
        <p>
          <strong>Block:</strong> {agreement.block}
        </p>
        <p>
          <strong>Room:</strong> {agreement.apartmentNo}
        </p>
        <p>
          <strong>Rent:</strong> ${agreement.rent}
        </p>
  
      </div>

      <Elements stripe={stripePromise}>
        <PaymentForm agreement={agreement} />
      </Elements>
    </div>
  );
};

export default MakePayment;
