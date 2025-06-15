import { NextFunction, Request, Response } from "express";
import { accessTokenService, refreshTokenService } from "./auth.service";

export const accessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jwt_secret, organization_code, user_id } = req.body;
    const { accessToken, refreshToken } = await accessTokenService(jwt_secret, organization_code, user_id);
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jwt_secret, refreshToken } = req.body;
    const { accessToken } = await refreshTokenService(jwt_secret, refreshToken);
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
