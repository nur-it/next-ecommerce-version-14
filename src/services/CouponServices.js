import { baseURL, handleResponse } from "./CommonServices";

const getShowingCoupons = async ({ cname }) => {
  try {
    const response = await fetch(`${baseURL}/coupon/show?cname=${cname}`);

    const coupons = await handleResponse(response);

    return {
      coupons,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export { getShowingCoupons };
