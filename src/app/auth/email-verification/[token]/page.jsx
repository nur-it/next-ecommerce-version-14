"use client";
import { useEffect, useState } from "react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
// internal imports
import Loading from "@components/preloader/Loading";
import { registerCustomer } from "@services/CustomerServices";
import { notifySuccess } from "@utils/toast";
import { useRouter } from "next/navigation";

const EmailVerification = ({ params }) => {
  const router = useRouter();

  // react hook
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    setLoading(true);
    registerCustomer(params?.token)
      .then((res) => {
        setLoading(false);
        setSuccess(res?.customer?.message);
        notifySuccess("Register Successfully!");
        router.push("/auth/login");

        // Cookies.set("_userInfo", JSON.stringify(res.customer), {
        //   sameSite: "None",
        //   secure: true,
        //   expires,
        // });
      })
      .catch((err) => {
        setLoading(false);
        setError(err?.response?.data?.message || err?.message);
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      {loading ? (
        <Loading loading={loading} />
      ) : success ? (
        <div className="text-emerald-500">
          <IoCheckmarkCircle className="mx-auto mb-2 text-center text-4xl" />
          <h2 className="text-xl font-medium">{success}</h2>
        </div>
      ) : (
        <div className="text-red-500">
          <IoCloseCircle className="mx-auto mb-2 text-center text-4xl" />
          <h2 className="text-xl font-medium">{error}</h2>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
