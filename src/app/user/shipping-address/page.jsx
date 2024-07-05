import Link from "next/link";
import { IoAddSharp } from "react-icons/io5";

// internal imports
import ShippingCard from "@components/shipping/ShippingCard";
import { getCname, getUserServerSession } from "@lib/auth-server";
import { showingTranslateValue } from "@lib/translate";
import { getCustomerById } from "@services/CustomerServices";
import { getStoreCustomizationSetting } from "@services/SettingServices";

const shippingAddress = async () => {
  // cname
  const cname = getCname();
  // user cookies data
  const userInfo = await getUserServerSession();

  // api calling
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();
  const { customer } = await getCustomerById({ cname, id: userInfo._id });

  return (
    <>
      <div className="flex flex-col">
        <h2 className="text-xl font-serif font-semibold mb-5">
          {showingTranslateValue(
            storeCustomizationSetting?.dashboard?.shipping_address
          )}
        </h2>

        <div className="grid md:grid-cols-3 grid-cols-2 gap-5 my-5">
          {customer?.shippingAddress?.map((shipping) => (
            <ShippingCard
              key={shipping._id}
              shipping={shipping}
              userInfo={userInfo}
            />
          ))}

          {customer?.shippingAddress?.length < 3 && (
            <Link
              href={"/user/add-new-shipping-address"}
              className={`flex flex-col items-center border border-gray-200 hover:border-green-500 transition-all duration-400 justify-center p-5 bg-white hover:bg-white rounded-md`}
            >
              <h4 className="flex flex-col items-center text-gray-500 text-sm font-semibold mb-2 capitalize">
                <p className="mb-5">Add New Shipping Address</p>
                <span className="text-3xl text-green-500">
                  <IoAddSharp />
                </span>
              </h4>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default shippingAddress;
