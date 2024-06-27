import { db } from "../utils/db";
import bcrypt from "bcryptjs";
import { values } from "lodash";
import * as z from "zod";
import { NewPasswordSchema, RegisterSchema } from "../schema/auth.schema";
import { getUserByEmail } from "../data/user";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  // Validate
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Find existing user
  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: "Email already in use!" };

  // Create user in db
  const created = await db.user.create({
    data: {
      name: name.trim(),
      email,
      password: hashedPassword,
    },
  });

  return { success: "User created!", data: created };
};
