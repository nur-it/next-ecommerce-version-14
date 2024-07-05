import { getCname } from "@lib/auth-server";
import { baseURL, handleResponse } from "./CommonServices";

const addReview = async (cname, body) => {
  try {
    const response = await fetch(`${baseURL}/review/add?cname=${cname}`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const review = await handleResponse(response);

    return {
      error: null,
      review,
    };
  } catch (error) {
    return {
      error: error.message,
      review: {},
    };
  }
};
const getReviewById = async (cname, id) => {
  try {
    const response = await fetch(`${baseURL}/review/${id}?cname=${cname}`, {
      cache: "no-cache",
    });

    const review = await handleResponse(response);

    return {
      error: null,
      review,
    };
  } catch (error) {
    return {
      error: error.message,
      review: {},
    };
  }
};
const getReviewByProductId = async (cname, productId) => {
  try {
    const response = await fetch(
      `${baseURL}/review?cname=${cname}&productId=${productId}`,
      {
        cache: "no-cache",
      }
    );

    const review = await handleResponse(response);

    return {
      error: null,
      review,
    };
  } catch (error) {
    return {
      error: error.message,
      review: {},
    };
  }
};
const updateReview = async (cname, id, body) => {
  try {
    const response = await fetch(`${baseURL}/review/${id}?cname=${cname}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    const review = await handleResponse(response);

    return {
      error: null,
      review,
    };
  } catch (error) {
    return {
      error: error.message,
      review: {},
    };
  }
};

const getAllReviews = async ({ id, cname, limit = 5, page = 1, sort }) => {
  try {
    const response = await fetch(
      `${baseURL}/review/${id}&cname=${cname}&limit=${limit}&page=${page}&sort=${sort}`,
      body
    );

    const reviews = await handleResponse(response);

    return {
      error: null,
      reviews,
    };
  } catch (error) {
    return {
      error: error.message,
      reviews: [],
    };
  }
};

const showUserOrderProductReview = async ({
  page = 1,
  limit = 8,
  user = null,
  sellFrom = null,
}) => {
  const cname = getCname();

  try {
    const response = await fetch(
      `${baseURL}/review/show/user/order/product?user=${user}&sellFrom=${sellFrom}&limit=${limit}&page=${page}&cname=${cname}`,
      {
        cache: "no-cache",
      }
    );

    const reviews = await handleResponse(response);

    return {
      error: null,
      reviews,
    };
  } catch (error) {
    return {
      error: error.message,
      reviews: [],
    };
  }
};

export {
  addReview,
  getAllReviews,
  getReviewById,
  getReviewByProductId,
  showUserOrderProductReview,
  updateReview,
};
