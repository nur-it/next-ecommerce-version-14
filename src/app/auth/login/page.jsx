"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLock, FiMail } from "react-icons/fi";

//internal  import
import Error from "@components/form/Error";
import InputArea from "@components/form/InputArea";
import BottomNavigation from "@components/login/BottomNavigation";
import { getUserSession } from "@lib/auth-client";
import { notifyError } from "@utils/toast";

const Login = () => {
  const userInfo = getUserSession();

  const [loading, setLoading] = useState(false);
  const redirectUrl = useSearchParams().get("redirectUrl") || "/user/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: redirectUrl || "/",
    });

    setLoading(false);

    if (result?.error) {
      notifyError(result?.error);
      console.error("Error during sign-in:", result.error);
      // Handle error display here
    } else if (result?.ok) {
      // const urlSplit = result?.url?.split("//");
      // const addCname = `${cname}.${urlSplit[1]}`;
      // const url = `${urlSplit[0]}//${addCname}`;
      // return redirect("/");

      window.location.href = "/";
    }
  };

  if (userInfo) {
    return redirect("/");
  }

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-4 flex flex-col lg:flex-row w-full">
          <div className="w-full sm:p-5 lg:p-8">
            <div className="mx-auto text-left justify-center rounded-md w-full max-w-lg px-4 py-8 sm:p-10 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2x">
              <div className="overflow-hidden mx-auto">
                <div className="text-center">
                  <h2 className="text-3xl font-bold">Login</h2>
                  <p className="text-sm md:text-base text-gray-500 mt-1 mb-4">
                    Login with your email and password
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className="flex flex-col justify-center"
                >
                  <div className="grid grid-cols-1 gap-5">
                    <div className="form-group">
                      <InputArea
                        register={register}
                        defaultValue="justin@gmail.com"
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="username"
                        Icon={FiMail}
                      />
                      <Error errorName={errors?.email?.message} />
                    </div>

                    <div className="form-group">
                      <InputArea
                        register={register}
                        defaultValue="12345678"
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        Icon={FiLock}
                      />

                      <Error errorName={errors?.password?.message} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex ms-auto">
                        <Link
                          href={"/auth/forgot-password"}
                          type="button"
                          className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>

                    {loading ? (
                      <button
                        disabled={loading}
                        type="submit"
                        className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                      >
                        <img
                          src="/loader/spinner.gif"
                          alt="Loading"
                          width={20}
                          height={10}
                        />
                        <span className="ml-2 font-light">Processing</span>
                      </button>
                    ) : (
                      <button
                        disabled={loading}
                        type="submit"
                        className="w-full text-center py-3 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
                      >
                        Login
                      </button>
                    )}
                  </div>
                </form>

                <BottomNavigation
                  or={true}
                  route={"/auth/signup"}
                  pageName={"Sign Up"}
                  loginTitle="Login"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
