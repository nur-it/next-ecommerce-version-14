"use client";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

// internal imports
import Error from "@components/form/Error";
import Label from "@components/form/Label";
import SubmitButton from "@components/form/SubmitButton";
import SwitchToggle from "@components/form/SwitchToggle";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { getUserSession } from "@lib/auth-client";
import { getShowingCountry } from "@services/CountryServices";
import {
  addShippingAddress,
  shippingAddressUpdate,
} from "@services/CustomerServices";
import { notifyError, notifySuccess } from "@utils/toast";

const CreateAddress = ({
  edit,
  cname,
  shippingId,
  singleAddress,
  isHaveDefaultAddress,
}) => {
  const userInfo = getUserSession();
  const { t } = useTranslation();
  const { showingTranslateValue } = useUtilsFunction();

  // react hook
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const [state, formAction] = useFormState(
    edit ? shippingAddressUpdate : addShippingAddress,
    { shippingId: edit ? shippingId : null, userId: userInfo?._id }
  );

  useEffect(() => {
    if (state?.success) {
      notifySuccess(`Add Shipping Address ${state?.success}`);
    } else if (state?.error) {
      notifyError("something wrong?");
    }
  }, [state]);

  useEffect(() => {
    getShowingCountry({ cname })
      .then((res) => {
        setIsLoading(false);
        setCountries(res?.countries);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, [cname]);

  useEffect(() => {
    if (singleAddress) {
      setIsDefaultAddress(singleAddress?.isDefault);
    }
  }, [edit]);

  return (
    <form action={formAction} className="flex flex-col justify-center">
      <div className="grid grid-cols-1 gap-5">
        <div className="flex md:flex-row flex-col gap-3">
          <div className="w-full">
            <Label label={"Country"} />

            {isLoading ? (
              "Loading..."
            ) : (
              <select
                className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                name="country"
                defaultValue={edit ? singleAddress?.country : ""}
              >
                <option value="" defaultValue hidden>
                  Select Country
                </option>
                {countries?.map((country, index) => (
                  <option
                    key={index + 1}
                    value={showingTranslateValue(country?.name)?.toLowerCase()}
                  >
                    {showingTranslateValue(country?.name)}
                  </option>
                ))}
              </select>
            )}

            <Error errorName={state?.errors?.country} />
          </div>

          <div className="w-full">
            <Label label={t("common:city")} />

            <div>
              <input
                type="text"
                name="city"
                placeholder={t("common:city")}
                defaultValue={edit ? singleAddress?.city : ""}
                className="py-2 pl-4 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
              />
            </div>

            <Error errorName={state?.errors?.city} />
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-3">
          <div className="w-full">
            <Label label={t("common:streetAddress")} />

            <div>
              <input
                type="text"
                name="address"
                placeholder={t("common:streetAddress")}
                defaultValue={edit ? singleAddress?.address : ""}
                className="py-2 pl-4 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
              />
            </div>

            <Error errorName={state?.errors?.address} />
          </div>

          <div className="w-full">
            <Label label={t("common:zIPPostal")} />

            <div>
              <input
                type="text"
                name="zipCode"
                placeholder="2345"
                defaultValue={edit ? singleAddress?.zipCode : ""}
                className="py-2 pl-4 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
              />
            </div>

            <Error errorName={state?.errors?.zipCode} />
          </div>
        </div>

        {isHaveDefaultAddress ? (
          <div className="flex md:flex-row flex-col">
            <div className="flex w-full">
              <h6 className="text-sm font-semibold text-gray-600 mr-3">
                Use Default Shipping Address
              </h6>

              <div>
                <SwitchToggle
                  name={"isDefault"}
                  enable={edit ? singleAddress?.isDefault : isDefaultAddress}
                  setEnabled={setIsDefaultAddress}
                />
              </div>
            </div>
          </div>
        ) : singleAddress?.isDefault ? (
          <div className="flex md:flex-row flex-col">
            <div className="flex w-full">
              <h6 className="text-sm font-semibold text-gray-600 mr-3">
                Use Default Shipping Address
              </h6>

              <div>
                <SwitchToggle
                  name={"isDefault"}
                  enable={isDefaultAddress}
                  setEnabled={setIsDefaultAddress}
                />
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-3">
          <div className="col-span-2"></div>
          <SubmitButton text={`${edit ? "Edit" : "Add New"} address`} />
        </div>
      </div>
    </form>
  );
};

export default CreateAddress;
