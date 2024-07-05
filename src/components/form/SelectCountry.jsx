"use client";
import { useEffect, useState } from "react";
// internal imports
import useUtilsFunction from "@hooks/useUtilsFunction";
import { getShowingCountry } from "@services/CountryServices";

const SelectCountry = ({
  cname,
  name,
  label,
  register,
  required,
  shippingCarrier,
  handleShippingCarrier,
}) => {
  // react hook
  const [isLoading, setIsLoading] = useState(true);
  const [countryList, setCountryList] = useState([]);

  console.log("countryList >><<", countryList);

  // custom hook
  const { showingTranslateValue } = useUtilsFunction();

  // handler
  const handleChangeShipping = () => {
    if (shippingCarrier) {
      return handleShippingCarrier(shippingCarrier);
    } else {
      return null;
    }
  };

  useEffect(() => {
    getShowingCountry({ cname })
      .then((res) => {
        setIsLoading(false);
        setCountryList(res?.countries);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, [cname]);

  return (
    <>
      {isLoading ? (
        "loading..."
      ) : (
        <select
          className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
          name={name}
          {...register(`${name}`, {
            required: required ? false : `${label} is required!`,
          })}
          onBlur={handleChangeShipping}
        >
          <option value="" defaultValue hidden>
            Select Country
          </option>

          {countryList?.map((country) => {
            return (
              <option
                key={country._id}
                value={showingTranslateValue(country?.name)?.toLowerCase()}
              >
                {showingTranslateValue(country?.name)}
              </option>
            );
          })}
        </select>
      )}
    </>
  );
};

export default SelectCountry;
