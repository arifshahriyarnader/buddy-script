import { Request, Response } from "express";
import { LoginRequestBody } from "../types";
import { loginValidation } from "../validations";
import { loginServices } from "../services";

export const loginController = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const parsed = loginValidation.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid request data",
        errors: parsed.error.issues,
      });
    }

    const { type, email, password, refreshToken } = parsed.data;

    let result;
    if (type === "email") {
      result = await loginServices.handleEmailLogin(email!, password!);
    } else if (type === "refresh") {
      result = await loginServices.refreshAccessToken(refreshToken!);
    } else {
      return res.status(400).json({ message: "Invalid login type" });
    }

    return res.json(result);
  } catch (error: any) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";

    if (errorMessage.includes("not found")) {
      return res.status(404).json({ message: errorMessage });
    } else if (
      errorMessage.includes("Invalid password") ||
      errorMessage.includes("Unauthorized")
    ) {
      return res.status(401).json({ message: errorMessage });
    } else {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
};
