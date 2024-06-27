import { Request, Response } from "express";
import { PaginationSchema } from "../schema/pagination.schema";
import * as z from "zod";
import { getListUserService } from "../service/user.service";

export async function getList(
  req: Request<{}, {}, z.infer<typeof PaginationSchema>>,
  res: Response
) {
  const { page, recordPerPage } = req.query;

  // Ensure that page and recordPerPage are numbers
  const pageNumber = parseInt(page as string, 10);
  const recordsPerPage = parseInt(recordPerPage as string, 10);

  // Validate that the parsed values are numbers
  if (isNaN(pageNumber) || isNaN(recordsPerPage)) {
    return res.status(400).send("Invalid pagination parameters");
  }

  try {
    const user = await getListUserService({
      page: pageNumber,
      recordPerPage: recordsPerPage,
    });
    return res.json(user);
  } catch (error) {
    return res
      .status(500)
      .send("An error occurred while fetching the user list");
  }
}
