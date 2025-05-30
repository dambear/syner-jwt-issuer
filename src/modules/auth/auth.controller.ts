import { NextFunction, Request, Response } from "express";
import { accessTokenService, refreshTokenService } from "./auth.service";

export const accessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jwt_secret, organization_code, user_id } = req.body;
    const { access_token, refresh_token } = await accessTokenService(jwt_secret, organization_code, user_id);
    res.status(200).json({ access_token, refresh_token });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jwt_secret, refresh_token } = req.body;
    const { access_token } = await refreshTokenService(jwt_secret, refresh_token);
    res.status(200).json({ access_token });
  } catch (error) {
    next(error);
  }
};
