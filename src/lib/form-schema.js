import { z } from "zod";

const signupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

const loginFormSchema = z.object({
  registerEmail: z
    .string()
    .email({ message: "Please enter a valid email." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "At least 8 characters long" })
    // .regex(/[a-zA-Z]/, { message: "at least one letter." })
    .regex(/[0-9]/, { message: "contain at least one number." })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: "contain at least one special character.",
    // })
    .trim(),
});

const forgetPasswordFormSchema = z.object({
  verifyEmail: z
    .string()
    .email({ message: "Please enter a valid email." })
    .trim(),
});

const resetPasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
    confirmPassword: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .trim(),
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

const changePasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  currentPassword: z
    .string()
    .min(8, { message: "At least 8 characters long" })
    .trim(),
  newPassword: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

const createShippingAddressFormSchema = z.object({
  address: z.string().nonempty("address field is required!"),
  city: z.string().nonempty("city field is required!"),
  country: z.string().nonempty("country field is required!"),
  zipCode: z.string().nonempty("zip Code field is required!"),
  isDefault: z.boolean(),
});

export {
  changePasswordFormSchema,
  createShippingAddressFormSchema,
  forgetPasswordFormSchema,
  loginFormSchema,
  resetPasswordFormSchema,
  signupFormSchema,
};
