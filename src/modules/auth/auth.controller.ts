import { NextFunction, Request, Response } from "express";
import { accessTokenService, refreshTokenService } from "./auth.service";

export const accessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { organization_code, user_id } = req.body;
    const { accessToken, refreshToken } = await accessTokenService(organization_code, user_id);
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refresh_token } = req.body;
    const { accessToken, refreshToken } = await refreshTokenService(refresh_token);
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};
