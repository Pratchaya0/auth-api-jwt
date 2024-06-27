import { Request, Response } from "express";
import * as z from "zod";
import { RegisterSchema } from "../schema/auth.schema";

export async function registerController(
  req: Request<{}, {}, z.infer<typeof RegisterSchema>>,
  res: Response
) {
  const body = req.body;

  console.log(req);

  console.log(body);

//   const temp = RegisterSchema.parse(body.body);
//   console.log(temp);

  return res.send("Hello world");
}
