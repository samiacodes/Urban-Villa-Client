// src/Pages/dashboard/PaymentForm.jsx
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const PaymentForm = ({ agreement }) => {

  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalRent, setFinalRent] = useState(agreement.rent);

  // 🔹 1. Get client secret
  useEffect(() => {
    if (agreement?.rent) {
      axiosSecure
        .post("/create-payment-intent", { rent: finalRent })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [axiosSecure, agreement.rent, finalRent]);

  // 🔹 2. Handle coupon apply
  const handleApplyCoupon = async () => {
    try {
      const res = await axiosSecure.get(`/coupons`);
      const matched = res.data.find(
        (c) =>
          c.code.toLowerCase() === couponCode.toLowerCase() &&
          c.available === true
      );

      if (matched) {
        const percent = matched.discount || 0;
        const discountedRent =
          agreement.rent - (agreement.rent * percent) / 100;
        setDiscount(percent);
        setFinalRent(parseFloat(discountedRent.toFixed(2)));
        toast.success(`Coupon applied! ${percent}% discount`);
      } else {
        toast.error("Invalid coupon code");
        setDiscount(0);
        setFinalRent(agreement.rent);
      }
    } catch (err) {
      toast.error("Failed to apply coupon",err);
    }
  };

  // 🔹 3. Handle Payment Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);
    const card = elements.getElement(CardElement);
    if (!card) return;

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email,
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // Save to DB
      const paymentData = {
        userEmail: user.email,
        amount: finalRent,
        floor: agreement.floor,
        block: agreement.block,
        apartmentNo: agreement.apartmentNo,
        date: new Date(),
        transactionId: paymentIntent.id,
        discountApplied: discount,
        paidTime: new Date().toLocaleString("default", { month: "long" }),
        month: selectedMonth,
      };

      try {
        await axiosSecure.post("/payments", paymentData);
        toast.success("✅ Payment successful!");
      } catch (err) {
        toast.error("Payment succeeded, but failed to save.",err);
      }
    }

    setProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-4 rounded shadow space-y-4"
    >
      <CardElement />
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter coupon"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="input input-bordered flex-1"
        />
        <button
          type="button"
          onClick={handleApplyCoupon}
          className="btn btn-secondary"
        >
          Apply
        </button>
      </div>
      <p>
        <strong>Total Rent:</strong> ${finalRent}{" "}
        {discount > 0 && (
          <span className="text-primary ml-2">({discount}% off)</span>
        )}
      </p>
      <select
        className="select select-bordered w-full"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        required
      >
        <option disabled value="">
          Select month
        </option>
        {["July", "August", "September", "October"].map((month) => (
          <option key={month}>{month}</option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded disabled:opacity-60"
        disabled={!stripe || processing}
      >
        {processing ? "Processing..." : "Pay"}
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default PaymentForm;
