"use client";
import SwitchToggleShippingAdd from "@components/form/SwitchToggleShippingAdd";
import getCookieData from "@utils/getCookieData";
import { useState } from "react";

const ShippingAddressSwitch = () => {
  // react hook
  const [existingShippingAddress, setExistingShippingAddress] = useState(false);

  // get cookies data
  const { userInfo: findUser } = getCookieData();

  return (
    <div className="col-span-6 sm:col-span-3 lg:col-span-2 justify-end">
      <div className="col-span-6 sm:col-span-6 lg:col-span-2 items-start justify-start">
        {!existingShippingAddress ? (
          findUser?.shippingAddress?.length === 0 ? null : (
            <div>
              <SwitchToggleShippingAdd
                className={"justify-start"}
                title={"Save Shipping Address"}
                setExistingShipping={setExistingShippingAddress}
                existingShipping={existingShippingAddress}
              />
            </div>
          )
        ) : (
          <div>
            <SwitchToggleShippingAdd
              className={"justify-start"}
              title={"Save Shipping Address"}
              existingShipping={existingShippingAddress}
              setExistingShipping={setExistingShippingAddress}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingAddressSwitch;
