import { baseURL, handleResponse } from "./CommonServices";

const getShowingStoreCategory = async ({ cname }) => {
  try {
    const response = await fetch(
      `${baseURL}/category/store/show?cname=${cname}`,
      {
        cache: "no-cache",
      }
    );

    const categories = await handleResponse(response);

    return {
      categories,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const getShowingCategory = async ({ cname }) => {
  try {
    const response = await fetch(`${baseURL}/category/show?cname=${cname}`, {
      cache: "no-cache",
    });

    const categories = await handleResponse(response);

    return {
      categories,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const getCategoryById = async ({ cname, id }) => {
  try {
    const response = await fetch(`${baseURL}/category/${id}/?cname=${cname}`, {
      cache: "no-cache",
    });

    const category = await handleResponse(response);

    return {
      category,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export { getCategoryById, getShowingCategory, getShowingStoreCategory };
