import { getCname } from "@lib/auth-server";
import { baseURL, handleResponse } from "./CommonServices";

const getStoreDetails = async () => {
  try {
    const cname = getCname();
    const response = await fetch(
      `${baseURL}/site/details/store?cname=${cname}`
    );

    const siteDetails = await handleResponse(response);

    return {
      siteDetails,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export { getStoreDetails };
