import { baseURL, handleResponse } from "./CommonServices";

const addOrder = async ({ cname, token, orderInfo }) => {
  try {
    // console.log("cname", cname, "token", token, "orderInfo", orderInfo);
    // return;
    const response = await fetch(`${baseURL}/order/add?cname=${cname}`, {
      cache: "no-cache",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: token ? `Bearer ${token}` : null,
      },

      body: JSON.stringify({ orderInfo }),
    });

    const order = await handleResponse(response);

    return {
      order,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const createPaymentIntent = async ({ cname, body }) => {
  try {
    const response = await fetch(
      `${baseURL}/order/create-payment-intent?cname=${cname}`,
      {
        method: "POST",
        body: JSON.stringify(body),
        cache: "no-cache",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const createPayment = await handleResponse(response);

    return {
      error: null,
      createPayment,
    };
  } catch (error) {
    return {
      error: error.message,
      createPayment: {},
    };
  }
};

const getOrderByCustomer = async ({
  cname,
  page = 1,
  limit = 8,
  user = null,
  sellFrom = null,
}) => {
  try {
    const response = await fetch(
      `${baseURL}/order?limit=${limit}&page=${page}&sellFrom=${sellFrom}&user=${user}&cname=${cname}`,
      {
        cache: "no-cache",
      }
    );

    const customerOrders = await handleResponse(response);

    return {
      data: customerOrders,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const getOrderById = async ({ id, cname }) => {
  try {
    const response = await fetch(`${baseURL}/order/user/${id}?cname=${cname}`, {
      cache: "no-cache",
    });

    const singleOrder = await handleResponse(response);

    return {
      error: null,
      singleOrder: singleOrder.order,
    };
  } catch (error) {
    return {
      error: error.message,
      singleOrder: {},
    };
  }
};

const sendEmailInvoiceToAdminsAndCustomer = async ({ cname, updatedData }) => {
  try {
    const response = await fetch(
      `${baseURL}/orders/admin/customer/invoice?cname=${cname}`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    const invoiceSendMail = await handleResponse(response);

    return {
      invoiceSendMail,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export {
  addOrder,
  createPaymentIntent,
  getOrderByCustomer,
  getOrderById,
  sendEmailInvoiceToAdminsAndCustomer,
};
