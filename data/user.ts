import { RegisterSchema } from "../schema/auth.schema";
import { db } from "../utils/db";
import * as z from "zod";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getListUsers = async (skip: number, take: number) => {
  try {
    const users = await db.user.findMany({
      skip: skip,
      take: take,
    });

    return users;
  } catch {
    return null;
  }
};