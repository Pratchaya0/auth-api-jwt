import * as z from "zod";

export const PaginationSchema = z.object({
  page: z
    .number({
      message: "Page is required",
    })
    .positive(),
  recordPerPage: z
    .number({
      message: "Records per page is required",
    })
    .positive(),
});
