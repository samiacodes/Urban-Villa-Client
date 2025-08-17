// src/Pages/dashboard/PaymentHistory.jsx
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import MoonLoaderComponent from "../../Shared/Loader/MoonLoaderComponent";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <MoonLoaderComponent/>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4"> My Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Month</th>
              <th>Amount</th>
              <th>Discount</th>
              <th>Apartment</th>
              <th>Transaction ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="bg-white text-center">
            {payments.map((payment, index) => (
              <tr
                key={payment._id}
                className="hover:bg-secondary/10 transition-all duration-300"
              >
                <td>{index + 1}</td>
                <td>{payment.month || "N/A"}</td>
                <td>${payment.amount}</td>
                <td>
                  {payment.discountApplied
                    ? `${payment.discountApplied}%`
                    : "0%"}
                </td>
                <td>
                  {payment.floor}-{payment.block}-{payment.apartmentNo}
                </td>
                <td className="text-xs">{payment.transactionId}</td>
                <td>{new Date(payment.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
