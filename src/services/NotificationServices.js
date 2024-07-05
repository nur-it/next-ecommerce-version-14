import { baseURL, handleResponse } from "./CommonServices";

const addNotification = async ({ cname, notificationInfo }) => {
  try {
    const response = await fetch(`${baseURL}/notification/add?cname=${cname}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      method: "POST",
      body: JSON.stringify(notificationInfo),
    });

    const notification = await handleResponse(response);

    return {
      notification,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const getAllNotification = async (cname, page) => {
  try {
    const response = await fetch(
      `${baseURL}/notification/?cname=${cname}&page=${page}`
    );

    const notifications = await handleResponse(response);

    return {
      error: null,
      notifications,
    };
  } catch (error) {
    return {
      error: error.message,
      notifications: [],
    };
  }
};

export { addNotification, getAllNotification };
