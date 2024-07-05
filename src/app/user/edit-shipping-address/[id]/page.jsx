import { getCname } from "@lib/auth-server";

// internal imports
import CreateAddress from "@components/user-dashboard/CreateAddress";
import { getCustomerById } from "@services/CustomerServices";

const EditShippingAddress = async ({ params, searchParams }) => {
  // cname
  const cname = getCname();

  // api calling
  const { customer } = await getCustomerById({
    cname,
    id: searchParams?.userId,
  });
  const singleAddress = customer?.shippingAddress?.find(
    (value) => value._id === params?.id
  );
  const defaultAddress = customer?.shippingAddress?.filter(
    (value) => value.isDefault
  );

  return (
    <>
      <h2 className="text-xl font-serif font-semibold mb-5">
        Edit shipping address
      </h2>

      <CreateAddress
        edit
        cname={cname}
        shippingId={params?.id}
        singleAddress={singleAddress}
        isHaveDefaultAddress={defaultAddress?.length === 0}
      />
    </>
  );
};

export default EditShippingAddress;
