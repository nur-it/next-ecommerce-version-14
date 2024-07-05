"use client";
import Cookies from "js-cookie";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// internal imports
import Error from "@components/form/Error";
import InputArea from "@components/form/InputArea";
import Label from "@components/form/Label";
import Uploader from "@components/image-uploader/Uploader";
// import { showingTranslateValue } from "@lib/translate";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { updateCustomer } from "@services/CustomerServices";
import { notifyError, notifySuccess } from "@utils/toast";

const UserProfileForm = ({ cname, userInfo, storeCustomizationSetting }) => {
  const { showingTranslateValue } = useUtilsFunction();
  const { t } = useTranslation();

  // react hook
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userData = {
        name: data.name,
        email: data.email,
        address: data.address,
        phone: data.phone,
        image: imageUrl || "",
      };

      const { customer } = await updateCustomer({
        cname,
        id: userInfo._id,
        body: userData,
      });

      setLoading(false);
      notifySuccess(customer.message);

      Cookies.set("_userInfo", JSON.stringify(customer.customer), {
        sameSite: "None",
        secure: true,
      });

      window.location.reload();
    } catch (err) {
      console.log("err", err);
      setLoading(false);
      notifyError(err?.response?.data?.message || err?.message);
    }
  };

  useEffect(() => {
    if (userInfo) {
      setValue("name", userInfo?.name);
      setValue("email", userInfo?.email);
      setValue("address", userInfo?.address);
      setValue("phone", userInfo?.phone);
      setImageUrl(userInfo?.image);
    }
  }, [userInfo]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <div className="bg-white space-y-6">
          <div>
            <Label label={t("common:photo")} />
            <div className="mt-1 flex items-center">
              <Uploader
                required
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
              />
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid-cols-6 md:gap-6">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="lg:mt-6 mt-4 bg-white">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <InputArea
                      name="name"
                      type="text"
                      register={register}
                      label={showingTranslateValue(
                        storeCustomizationSetting?.dashboard?.full_name
                      )}
                      placeholder={showingTranslateValue(
                        storeCustomizationSetting?.dashboard?.full_name
                      )}
                    />
                    <Error errorName={errors.name} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <InputArea
                      type="text"
                      name="address"
                      register={register}
                      label={showingTranslateValue(
                        storeCustomizationSetting?.dashboard?.address
                      )}
                      placeholder={showingTranslateValue(
                        storeCustomizationSetting?.dashboard?.address
                      )}
                    />
                    <Error errorName={errors.address} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <InputArea
                      register={register}
                      label={showingTranslateValue(
                        storeCustomizationSetting?.dashboard?.user_phone
                      )}
                      name="phone"
                      type="tel"
                      placeholder={showingTranslateValue(
                        storeCustomizationSetting?.dashboard?.user_phone
                      )}
                    />
                    <Error errorName={errors.phone} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <InputArea
                      name="email"
                      type="email"
                      readOnly={true}
                      register={register}
                      label={showingTranslateValue(
                        storeCustomizationSetting?.dashboard?.user_email
                      )}
                      placeholder={showingTranslateValue(
                        storeCustomizationSetting?.dashboard?.user_email
                      )}
                    />
                    <Error errorName={errors.email} />
                  </div>
                </div>

                <div className="col-span-6 sm:col-span-3 mt-5 text-right">
                  {loading ? (
                    <button
                      type="button"
                      style={{
                        backgroundColor:
                          storeCustomizationSetting?.color?.bg_button?.hex,
                      }}
                      className={`bg-green-700 hover:text-white hover:bg-green-800 text-white md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto`}
                    >
                      <img
                        src="/loader/spinner.gif"
                        alt="Loading"
                        width={20}
                        height={10}
                      />
                      <span className="font-serif ml-2 font-light">
                        Processing
                      </span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      style={{
                        backgroundColor:
                          storeCustomizationSetting?.color?.bg_button?.hex,
                      }}
                      className={`bg-green-700 hover:text-white hover:bg-green-800 text-white md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto`}
                    >
                      {showingTranslateValue(
                        storeCustomizationSetting?.dashboard?.update_button
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserProfileForm;
