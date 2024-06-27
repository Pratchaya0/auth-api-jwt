import { PaginationSchema } from "../schema/pagination.schema";
import { db } from "../utils/db";
import * as z from "zod";
import { getListUsers } from "../data/user";

export const getListUserService = async (
  pagination: z.infer<typeof PaginationSchema>
) => {
  const validatedFields = PaginationSchema.safeParse(pagination);

  if (!validatedFields.success) {
    return { error: "Invalid Pagination!" };
  }

  const { page, recordPerPage } = validatedFields.data;

  const skip = page * recordPerPage - recordPerPage;

  const users = await getListUsers(skip, recordPerPage);

  return users;
};
