"use client";
import { Modal, ModalBody, ModalFooter } from "@windmill/react-ui";
import { IoTrashOutline } from "react-icons/io5";

// internal imports
import { shippingAddressDelete } from "@services/CustomerServices";
import { notifyError, notifySuccess } from "@utils/toast";
import { useState } from "react";

const DeleteModal = ({ modalShow, setModalShow, shippingId, userId }) => {
  // react hook
  const [isLoading, setIsLoading] = useState(false);

  // handle delete
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const { success } = await shippingAddressDelete(userId, shippingId);

      notifySuccess(success);
      setModalShow(false);
      setIsLoading(false);
    } catch (error) {
      notifyError(err ? err.response.data.message : err.message);
      setModalShow(false);
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={modalShow} onClose={() => setModalShow(!modalShow)}>
      <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
        <span className="flex justify-center text-3xl mb-6 text-red-500">
          <IoTrashOutline />
        </span>
        <h2 className="text-xl font-medium mb-2">
          <span className="text-red-500">
            Do You Want to Delete this Shipping Address?
          </span>
        </h2>
        <p className="text-gray-700">
          You can't use this in your checkout anymore if you delete!
        </p>
      </ModalBody>

      <ModalFooter className="justify-center">
        <button
          className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-gray-800 border-gray-200 border w-full mr-3 h-12 bg-gray-300 sm:w-auto hover:bg-gray-200 hover:border-gray-50"
          layout="outline"
          onClick={() => setModalShow(!modalShow)}
        >
          No, Keep It
        </button>

        <div className="flex justify-end ml-2">
          {isLoading ? (
            <button
              disabled={isLoading}
              type="submit"
              className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
            >
              <img
                src="/loader/spinner.gif"
                alt="Loading"
                width={20}
                height={10}
              />
              <span className=" ml-2 font-light">Processing</span>
            </button>
          ) : (
            <button
              disabled={isLoading}
              type="button"
              onClick={handleDelete}
              className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent hover:bg-red-500 hover:text-gray-100 w-full h-12 sm:w-auto"
            >
              Yes, Delete It
            </button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteModal;
