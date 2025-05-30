
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "./auth.utility";

import { TokenPayload } from "./auth.utility";

// Auth response type (optional but recommended)
interface AuthResponse {
  access_token: string;
  refresh_token?: string;
}

export const accessTokenService = async (jwt_secret: string, organization_code: string, user_id: number): Promise<AuthResponse> => {
  const access_token = generateAccessToken(jwt_secret, { organization_code, user_id });
  const refresh_token = generateRefreshToken(jwt_secret, { organization_code, user_id });
  return {
    access_token,
    refresh_token,
  };
};

export const refreshTokenService = async (jwt_secret:string, refresh_token: string): Promise<AuthResponse> => {
    const payload = verifyToken(jwt_secret, refresh_token) as TokenPayload;
    const access_token = generateAccessToken(jwt_secret, payload);
    return {
      access_token,
    }
};
