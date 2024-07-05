"use client";
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
//internal import
import { UserContext } from "@context/UserContext";
import { loginCustomer, verifyEmailAddress } from "@services/CustomerServices";
import { notifyError, notifySuccess } from "@utils/toast";

const useLoginSubmit = (setModalOpen) => {
  const cname = window.location.host.split(".")[0];

  const { dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({
    name,
    email,
    registerEmail,
    verifyEmail,
    password,
  }) => {
    try {
      setLoading(true);

      if (registerEmail && password) {
        const { customer } = await loginCustomer(cname, {
          registerEmail,
          password,
        });

        setLoading(false);
        setModalOpen(false);
        // router.push("/");
        notifySuccess("Login Success!");
        dispatch({ type: "USER_LOGIN", payload: res });
        Cookies.set("_userInfo", JSON.stringify(res), {
          sameSite: "None",
          secure: true,
        });
      }

      if (name && email && password) {
        const { customer } = await verifyEmailAddress(cname, {
          name,
          email,
          password,
        });

        setLoading(false);
        setModalOpen(false);
        notifySuccess(customer.message);
      }
    } catch (err) {
      setLoading(false);
      notifyError(err ? err.response.data.message : err.message);
    }
  };

  const handleGoogleSignIn = async (user) => {
    try {
      if (user?.profileObj?.name) {
        setModalOpen(false);
        notifySuccess("Login success!");
        // router.push("/");
        dispatch({ type: "USER_LOGIN", payload: res });
        Cookies.set("_userInfo", JSON.stringify(res), {
          sameSite: "None",
          secure: true,
        });
      }
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message);
      setModalOpen(false);
    }
  };

  return {
    handleSubmit,
    submitHandler,
    handleGoogleSignIn,
    register,
    errors,
    GoogleLogin,
    loading,
  };
};

export default useLoginSubmit;
