import { getCname, getUserServerSession } from "@lib/auth-server";
import { getCustomerById } from "@services/CustomerServices";
import Link from "next/link";
import { IoAddSharp } from "react-icons/io5";

const MyAccount = async () => {
  // cname
  const cname = getCname();
  // user cookies data
  const userInfo = await getUserServerSession();

  const { customer } = await getCustomerById({ cname, id: userInfo._id });

  const defaultAddress =
    customer?.shippingAddress?.find((value) => value.isDefault) || {};

  return (
    <>
      <div className="overflow-hidden">
        <h2 className="text-xl font-serif font-semibold mb-5">My account</h2>
      </div>

      <div className="grid gap-4 mb-8 sm:grid-cols-2 grid-cols-1">
        <div className="flex h-full relative">
          <div className="flex items-center border border-gray-200 w-full rounded-lg p-4 relative">
            <a
              className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              href="/user/update-profile"
            >
              Edit
            </a>

            <div className="flex items-center justify-center rounded-full text-xl text-center mr-4 bg-gray-200">
              <img
                src={
                  userInfo?.image ||
                  "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                }
                width="64"
                height="64"
                className="h-16 w-16 rounded-full bg-gray-50"
                alt={userInfo.name}
              />
            </div>

            <div>
              <h5 className="leading-none mb-2 text-base font-medium text-gray-700">
                {userInfo?.name}
              </h5>
              <p className="text-sm text-gray-500">{userInfo?.email}</p>
              <p className="text-sm text-gray-500">{userInfo?.phone}</p>
            </div>
          </div>
        </div>

        {Object.keys(defaultAddress).length !== 0 ? (
          <div className="flex items-center border border-gray-200 w-full rounded-lg p-4 relative">
            <Link
              className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              href={`/user/edit-shipping-address/${defaultAddress?._id}?userId=${userInfo?._id}`}
            >
              Edit
            </Link>

            <div className="flex-grow">
              <h5 className="leading-none mb-2 text-base font-medium text-gray-700">
                {userInfo.name}{" "}
                <span className="text-xs text-gray-500">
                  (Default Shipping Address)
                </span>
              </h5>
              <p className="text-sm text-gray-500">{userInfo?.phone}</p>
              <p className="text-sm text-gray-500">{defaultAddress?.address}</p>
              <p className="text-sm text-gray-500">{`${defaultAddress?.country}, ${defaultAddress?.city} - ${defaultAddress?.zipCode}`}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-between border rounded-md shadow">
            <Link
              href={"/user/add-new-shipping-address"}
              className={`w-full flex flex-col items-center border transition-all duration-400 justify-center p-12 bg-green-600 rounded-md group`}
            >
              <h4 className="flex items-center justify-start gap-3 text-white group-hover:text-gray-100 text-sm font-semibold mb-2 capitalize">
                <span className="text-3xl text-white group-hover:text-gray-200">
                  <IoAddSharp />
                </span>
                <span className="">Add New Shipping Address</span>
              </h4>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default MyAccount;
