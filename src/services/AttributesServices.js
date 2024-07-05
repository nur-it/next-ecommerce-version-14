import { baseURL, handleResponse } from "./CommonServices";

const getShowingAttributes = async ({
  cname,
  id = "",
  ids = [],
  new_attribute = "",
}) => {
  try {
    const response = await fetch(
      `${baseURL}/attributes/show?id=${id}&ids=${ids}&new_attribute=${new_attribute}&cname=${cname}`,
      {
        cache: "no-cache",
      }
    );

    const attributes = await handleResponse(response);

    return {
      error: null,
      attributes,
    };
  } catch (error) {
    return {
      error: error.message,
      attributes: [],
    };
  }
};
export { getShowingAttributes };
