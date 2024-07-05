// internal imports
import CreateAddress from "@components/user-dashboard/CreateAddress";
import { getCname, getUserServerSession } from "@lib/auth-server";
import { getCustomerById } from "@services/CustomerServices";

const AddNewShippingAddress = async () => {
  // cname
  const cname = getCname();
  // user cookies data
  const userInfo = await getUserServerSession();

  // api calling
  const { customer } = await getCustomerById({ cname, id: userInfo._id });

  const defaultAddress = customer?.shippingAddress?.filter(
    (value) => value.isDefault
  );

  return (
    <>
      <h2 className="text-xl font-serif font-semibold mb-5">
        Add new shipping address
      </h2>

      <CreateAddress
        cname={cname}
        isHaveDefaultAddress={defaultAddress?.length === 0}
      />
    </>
  );
};

export default AddNewShippingAddress;
