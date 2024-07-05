"use server";
import { getCname } from "@lib/auth-server";
import {
  changePasswordFormSchema,
  loginFormSchema,
  shippingAddressFormSchema,
  updateProfileFormSchema,
} from "@lib/form-schema";
import { baseURL, handleResponse } from "@services/CommonServices";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getHeaders = (userInfo) => {
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: userInfo ? `Bearer ${userInfo?.token}` : null,
  };
  return header;
};

const loginCustomer = async (currentState, formData) => {
  const cname = getCname();

  const validatedFields = loginFormSchema.safeParse({
    registerEmail: formData.get("registerEmail"),
    password: formData.get("password"),
  });

  // return if there is any error
  if (validatedFields.error) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  } else {
    const { registerEmail, password } = validatedFields.data;

    try {
      const response = await fetch(`${baseURL}/customer/login?cname=${cname}`, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          registerEmail,
          password,
        }),
      });

      const customer = await handleResponse(response);

      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      cookies().set("_userInfo", JSON.stringify(customer), {
        sameSite: "None",
        secure: true,
        expires,
      });

      return {
        success: "Login Successfully!",
      };
    } catch (error) {
      return {
        error: error?.message,
      };
    }
  }
};

// Redirect function that can be called after loginCustomer resolves
const handleLogin = async (currentState, formData) => {
  const result = await loginCustomer(currentState, formData);
  const redirectUrl = formData.get("redirectUrl");

  if (result.success) {
    redirect(`/${redirectUrl}`);
  }

  return result;
};

const verifyEmailAddress = async (formData) => {
  // Validate form fields
  // const validatedFields = signupFormSchema.safeParse({
  //   name: formData.get("name"),
  //   email: formData.get("email"),
  //   password: formData.get("password"),
  // });
  // const validatedFields = {
  //   name: formData?.name,
  //   email: formData?.email,
  //   password: formData?.password,
  // };

  // If any form fields are invalid, return early
  // if (!validatedFields.success) {
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //   };
  // }

  const { name, password, email } = formData;

  try {
    const response = await fetch(`${baseURL}/customer/verify-email`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ name, email, password }),
    });

    const user = await handleResponse(response);

    return { user };
  } catch (error) {
    return { error: error.message };
  }
};

const changePassword = async (userInfo, currentState, formState) => {
  const validatedFields = changePasswordFormSchema.safeParse({
    email: formState.get("email"),
    currentPassword: formState.get("currentPassword"),
    newPassword: formState.get("newPassword"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, currentPassword, newPassword } = validatedFields.data;

  try {
    const response = await fetch(`${baseURL}/customer/change-password`, {
      cache: "no-cache",
      method: "POST",
      headers: getHeaders(userInfo),
      body: JSON.stringify({ email, currentPassword, newPassword }),
    });

    const updatedResponse = await handleResponse(response);

    // revalidatePath("/user/change-password");
    return {
      success: updatedResponse.message,
    };
  } catch (error) {
    // revalidatePath("/user/change-password");
    return { error: error.message };
  }
};

const updateCustomer = async (userInfo, currentState, formState) => {
  try {
    const validatedFields = updateProfileFormSchema.safeParse({
      name: formState.get("name"),
      address: formState.get("address"),
      phone: formState.get("phone"),
      email: formState.get("email"),
      image: formState.get("imageUrl"),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // console.log("updatedUser", validatedFields.data);
    // return;

    const response = await fetch(
      `${baseURL}/customer/${userInfo?.id}?cname=${cname}`,
      {
        cache: "no-cache",
        method: "PUT",
        headers: getHeaders(userInfo),
        body: JSON.stringify(validatedFields.data),
      }
    );

    const user = await handleResponse(response);
    // revalidatePath("/user/update-profile");
    return {
      success: "Profile updated successfully!",
      user: user,
    };
  } catch (error) {
    return { error: error.message };
  }
};

const addShippingAddress = async (userInfo, currentState, formState) => {
  try {
    const validatedFields = shippingAddressFormSchema.safeParse({
      name: formState.get("name"),
      address: formState.get("address"),
      phone: formState.get("phone"),
      country: formState.get("country"),
      city: formState.get("city"),
      area: formState.get("area"),
    });

    // revalidatePath("/");
    // return {
    //   success: "Hello from success message.",
    // };

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const shippingAddressId = formState.get("shippingAddressId") || "";

    const response = await fetch(
      `${baseURL}/customer/shipping/address/${userInfo._id}?cname=${cname}`,
      {
        cache: "no-cache",
        method: "POST",
        headers: getHeaders(userInfo),
        body: JSON.stringify(validatedFields.data),
      }
    );

    const res = await handleResponse(response);
    revalidatePath("/user/add-shipping-address");
    return {
      success: "Shipping address added successfully!",
    };
  } catch (error) {
    return { error: error.message };
  }
};

export {
  addShippingAddress,
  changePassword,
  handleLogin,
  loginCustomer,
  updateCustomer,
  verifyEmailAddress,
};
