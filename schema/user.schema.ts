import * as z from "zod";

export const UserSettingSchema = z
  .object({
    name: z.optional(
      z.string().min(1, {
        message: "Name is required",
      })
    ),
    isTwoFactorEnabled: z.optional(z.boolean()),
    image: z.optional(z.string()),
    role: z.string(),
    email: z.optional(
      z.string().email({
        message: "Email is required",
      })
    ),
    password: z.optional(
      z.string().min(8, { message: "Minimum 8 characters required" })
    ),
    newPassword: z.optional(
      z.string().min(8, { message: "Minimum 8 characters required" })
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );
