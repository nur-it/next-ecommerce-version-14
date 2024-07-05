"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// internal imports
import { getCname } from "@lib/auth-server";
import {
  changePasswordFormSchema,
  createShippingAddressFormSchema,
  forgetPasswordFormSchema,
  resetPasswordFormSchema,
  signupFormSchema,
} from "@lib/form-schema";
import getSession from "@utils/getSession";
import { baseURL, handleResponse } from "./CommonServices";

// login customer
const loginCustomer = async ({ email, password }) => {
  try {
    const cname = getCname();
    const response = await fetch(`${baseURL}/customer/login?cname=${cname}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ registerEmail: email, password }),
    });

    const userInfo = await handleResponse(response);

    return {
      userInfo,
    };
  } catch (error) {
    console.log("error on login::", error.message);
    return { error: error.message };
  }
};

// verify email address
const verifyEmailAddress = async (currentState, formData) => {
  const cname = getCname();

  const validatedFields = signupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // return if there is any error
  if (validatedFields.error) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  } else {
    const { name, email, password } = validatedFields.data;

    // code
    try {
      const response = await fetch(
        `${baseURL}/customer/verify-email?cname=${cname}`,
        {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      await handleResponse(response);

      return {
        success: "Registration Successfully!",
      };
    } catch (error) {
      return {
        error: error.message,
      };
    } finally {
      redirect("/auth/login");
    }
  }
};

// register
const registerCustomer = async (token, body) => {
  const cname = getCname();
  try {
    const response = await fetch(
      `${baseURL}/customer/register/${token}?cname=${cname}`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const customer = await handleResponse(response);

    return {
      error: null,
      customer,
    };
  } catch (error) {
    return {
      error: error.message,
      customer: {},
    };
  }
};

const signUpWithOauthProvider = async ({ name, email, image }) => {
  // return;
  const cname = getCname();
  try {
    const response = await fetch(
      `${baseURL}/customer/signup/oauth?cname=${cname}`,
      {
        cache: "no-cache",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, image }),
      }
    );

    const res = await handleResponse(response);
    // console.log("res", res);
    return { res };
  } catch (error) {
    return { error: error.message };
  }
};

// signUp
const signUpWithProvider = async (cname, body) => {
  try {
    const response = await fetch(`${baseURL}/customer/signup?cname=${cname}`, {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(body),
    });

    const customer = await handleResponse(response);

    return {
      error: null,
      customer,
    };
  } catch (error) {
    return {
      error: error.message,
      customer: {},
    };
  }
};

// forget password
const forgetPassword = async (currentState, formData) => {
  const cname = getCname();

  const validatedFields = forgetPasswordFormSchema.safeParse({
    verifyEmail: formData.get("verifyEmail"),
  });

  // return if there is any error
  if (validatedFields.error) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  } else {
    const { verifyEmail } = validatedFields.data;

    try {
      const response = await fetch(
        `${baseURL}/customer/forget-password?cname=${cname}`,
        {
          method: "PUT",
          cache: "no-cache",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            verifyEmail,
          }),
        }
      );

      await handleResponse(response);

      return {
        success: "Mail send Successfully!",
      };
    } catch (error) {
      return {
        error: error?.message,
      };
    }
  }
};

// rest password
const resetPassword = async (currentState, formData) => {
  const token = currentState.token;
  const cname = getCname();

  const validatedFields = resetPasswordFormSchema.safeParse({
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (validatedFields.error) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  } else {
    const { newPassword } = validatedFields.data;

    try {
      const response = await fetch(
        `${baseURL}/customer/reset-password?cname=${cname}`,
        {
          method: "PUT",
          cache: "no-cache",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            token,
            newPassword,
          }),
        }
      );

      const customer = await handleResponse(response);

      return {
        success: customer?.message,
      };
    } catch (error) {
      return {
        error: error?.message,
      };
    }
  }
};

// change password
const changePassword = async (currentState, formData) => {
  const cname = getCname();

  const validatedFields = changePasswordFormSchema.safeParse({
    email: formData.get("email"),
    newPassword: formData.get("newPassword"),
    currentPassword: formData.get("currentPassword"),
  });

  if (validatedFields.error) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  } else {
    const { email, newPassword, currentPassword } = validatedFields.data;

    try {
      const response = await fetch(
        `${baseURL}/customer/change-password?cname=${cname}`,
        {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ email, newPassword, currentPassword }),
        }
      );

      const customer = await handleResponse(response);

      return {
        success: customer?.message,
      };
    } catch (error) {
      return {
        error: error?.message,
      };
    }
  }
};

// update customer
const updateCustomer = async ({ cname, id, body }) => {
  try {
    const response = await fetch(`${baseURL}/customer/${id}?cname=${cname}`, {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const customer = await handleResponse(response);

    return {
      error: null,
      customer,
    };
  } catch (error) {
    return {
      error: error?.message,
    };
  }
};

// shipping address create
const addShippingAddress = async (currentState, formData) => {
  const userInfo = getSession();
  const cname = getCname();

  const validatedFields = createShippingAddressFormSchema.safeParse({
    address: formData.get("address"),
    city: formData.get("city"),
    country: formData.get("country"),
    zipCode: formData.get("zipCode"),
    isDefault: formData.get("isDefault") === "on" ? true : false,
  });

  if (validatedFields.error) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  } else {
    try {
      const { address, city, country, zipCode, isDefault } =
        validatedFields.data;

      const response = await fetch(
        `${baseURL}/customer/shipping/address/${userInfo._id}?cname=${cname}`,
        {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ address, city, country, zipCode, isDefault }),
        }
      );

      const customer = await handleResponse(response);

      return {
        success: customer?.message,
      };
    } catch (error) {
      return {
        error: error?.message,
      };
    } finally {
      redirect("/user/shipping-address");
    }
  }
};

// shipping address update
const shippingAddressUpdate = async (currentState, formData) => {
  const cname = getCname();

  const validatedFields = createShippingAddressFormSchema.safeParse({
    address: formData.get("address"),
    city: formData.get("city"),
    country: formData.get("country"),
    zipCode: formData.get("zipCode"),
    isDefault: formData.get("isDefault") === "on" ? true : false,
  });

  console.log("userInfo?._id", currentState?.userId);
  console.log("currentState?.shippingId", currentState?.shippingId);
  // return;

  if (validatedFields.error) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  } else {
    try {
      const { address, city, country, zipCode, isDefault } =
        validatedFields.data;

      const response = await fetch(
        `${baseURL}/customer/shipping/address/${currentState?.userId}/${currentState?.shippingId}/update?cname=${cname}`,
        {
          method: "PATCH",
          cache: "no-cache",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ address, city, country, zipCode, isDefault }),
        }
      );

      const customer = await handleResponse(response);

      return {
        success: customer?.message,
      };
    } catch (error) {
      console.log("error >><<", error);
      return {
        error: error?.message,
      };
    }
    //  finally {
    //   redirect("/user/shipping-address");
    // }
  }
};

// shipping address delete
const shippingAddressDelete = async (userId, shippingId) => {
  const cname = getCname();

  try {
    const response = await fetch(
      `${baseURL}/customer/shipping/address/${userId}/${shippingId}?cname=${cname}`,
      {
        method: "PUT",
        cache: "no-cache",
      }
    );

    const customer = await handleResponse(response);

    return {
      success: customer?.message,
    };
  } catch (error) {
    return {
      error: error?.message,
    };
  } finally {
    revalidatePath("/user/shipping-address");
  }
};

// get custom id
const getCustomerById = async ({ cname, id }) => {
  try {
    const response = await fetch(`${baseURL}/customer/${id}?cname=${cname}`);

    const customer = await handleResponse(response);

    return {
      customer,
    };
  } catch (error) {
    return {
      error: error?.message,
    };
  }
};

export {
  addShippingAddress,
  changePassword,
  forgetPassword,
  getCustomerById,
  loginCustomer,
  registerCustomer,
  resetPassword,
  shippingAddressDelete,
  shippingAddressUpdate,
  signUpWithOauthProvider,
  signUpWithProvider,
  updateCustomer,
  verifyEmailAddress,
};
