import { baseURL, handleResponse } from "./CommonServices";

const getShowingCountry = async ({ cname }) => {
  try {
    const response = await fetch(`${baseURL}/country/show?cname=${cname}`);

    const countries = await handleResponse(response);

    return {
      countries,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export { getShowingCountry };
