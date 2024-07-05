// internal imports
import CheckoutPage from "@components/checkout/CheckoutPage";
import { getCname, getUserServerSession } from "@lib/auth-server";
import { getCustomerById } from "@services/CustomerServices";
import {
  getGlobalSetting,
  getOnlineStoreSetting,
  getPosSetting,
  getShowingShipping,
  getStoreCustomizationSetting,
} from "@services/SettingServices";

const Checkout = async () => {
  const cname = getCname();
  const userInfo = await getUserServerSession();

  const { storeCustomizationSetting } = await getStoreCustomizationSetting();
  const { customer } = await getCustomerById({
    cname,
    id: userInfo?._id,
  });
  const { posSetting } = await getPosSetting();
  const { storeSetting } = await getOnlineStoreSetting();
  const { globalSetting } = await getGlobalSetting();
  const { shippingData, error } = await getShowingShipping({ cname });

  return (
    <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
      <div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
        <CheckoutPage
          cname={cname}
          customer={customer}
          shippingError={error}
          posSetting={posSetting}
          shippingData={shippingData}
          storeSetting={storeSetting}
          globalSetting={globalSetting}
          storeCustomizationSetting={storeCustomizationSetting}
        />

        {/* <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form> */}
        {/* <div className="form-group">
                <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                  01.{" "}
                  {showingTranslateValue(
                    storeCustomizationSetting?.checkout?.personal_details
                  )}
                </h2>

                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <Label
                      label={showingTranslateValue(
                        storeCustomizationSetting?.checkout?.first_name
                      )}
                    />

                    <input
                      name="firstName"
                      type="text"
                      placeholder="John"
                      className="py-2 pl-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                    />

                    <Error errorName={""} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Label
                      label={showingTranslateValue(
                        storeCustomizationSetting?.checkout?.last_name
                      )}
                    />
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      className="py-2 pl-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                    />
                    <Error errorName={""} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Label
                      label={showingTranslateValue(
                        storeCustomizationSetting?.checkout?.email_address
                      )}
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="youremail@gmail.com"
                      className="py-2 pl-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                    />
                    <Error errorName={""} />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Label
                      label={showingTranslateValue(
                        storeCustomizationSetting?.checkout?.checkout_phone
                      )}
                    />

                    <input
                      name="contact"
                      type="text"
                      placeholder="+062-6532956"
                      className="py-2 pl-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                    />

                    <Error errorName={""} />
                  </div>
                </div>
              </div> */}

        {/* <div className="form-group mt-12">
                <div className="grid grid-cols-6 gap-6 mb-5">
                  <div className="col-span-6 sm:col-span-3 lg:col-span-4">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      02.{" "}
                      {showingTranslateValue(
                        storeCustomizationSetting?.checkout?.shipping_details
                      )}
                    </h2>
                  </div> */}
        {/*========== Second time checkout shipping address  =================*/}

        {/* ======== Temporary hide - RMK =======   */}
        {/* <div className="col-span-6 sm:col-span-3 lg:col-span-2 justify-end">
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2 items-start justify-start">
                      {!existingShippingAddress ? (
                        findUser?.shippingAddress?.length === 0 ? null : (
                          <div>
                            <SwitchToggleShippingAdd
                              title={"Save Shipping Address"}
                              // setExistingShipping={setExistingShippingAddress}
                              setExistingShipping={() => {}}
                              existingShipping={existingShippingAddress}
                              className={"justify-start"}
                            />
                          </div>
                        )
                      ) : (
                        <div>
                          <SwitchToggleShippingAdd
                            title={"Save Shipping Address"}
                            setExistingShipping={() => {}}
                            existingShipping={existingShippingAddress}
                            className={"justify-start"}
                          />
                        </div>
                      )}
                    </div>
                  </div> */}
        {/* </div>
              </div> */}
        {/* </form>
          </div>
        </div> */}

        {/* <div></div> */}
      </div>
    </div>
  );
};

export default Checkout;
