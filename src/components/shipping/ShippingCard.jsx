"use client";
import { useState } from "react";
import { IoPencil, IoTrashOutline } from "react-icons/io5";
// internal imports
import DeleteModal from "@components/modal/DeleteModal";
import Link from "next/link";

const ShippingCard = ({ shipping, userInfo }) => {
  // react hook
  const [shippingId, setShippingId] = useState("");
  const [modalShow, setModalShow] = useState(false);

  // handle delete
  const handleDeleteShippingAddress = (id) => {
    setShippingId(id);
    setModalShow(!modalShow);
  };

  return (
    <>
      <DeleteModal
        userId={userInfo._id}
        modalShow={modalShow}
        shippingId={shippingId}
        setModalShow={setModalShow}
      />

      <div
        key={shipping._id}
        className={`flex flex-col border border-gray-200 hover:border-green-500 transition-all duration-400 justify-center p-5 bg-white hover:bg-white rounded-md relative`}
      >
        <div className="flex absolute top-4 right-4">
          <button
            onClick={() => handleDeleteShippingAddress(shipping._id)}
            className="text-xl text-red-500 hover:text-red-700 mr-2"
          >
            <IoTrashOutline />
          </button>

          <Link
            href={`/user/edit-shipping-address/${shipping._id}?userId=${userInfo._id}`}
            className="text-xl text-green-700 hover:text-green-800"
          >
            <IoPencil />
          </Link>
        </div>

        <div className="block text-gray-500 text-sm font-medium capitalize">
          Country: {shipping.country}
        </div>
        <div className="block text-gray-500 text-sm font-medium capitalize">
          City: {shipping.city}
        </div>
        <div className="flex justify-between text-gray-500 text-sm font-semibold capitalize">
          <p>Address: {shipping.address}</p>
        </div>

        <div className="block text-gray-500 text-sm font-medium capitalize">
          <p>ZipCode: {shipping.zipCode}</p>
        </div>

        <div className="block text-gray-500 text-sm font-medium capitalize">
          <p>Default Address: {shipping.isDefault ? "true" : "false"}</p>
        </div>
      </div>
    </>
  );
};

export default ShippingCard;
