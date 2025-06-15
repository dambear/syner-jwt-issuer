
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "./auth.utility";

import { TokenPayload } from "./auth.utility";

// Auth response type (optional but recommended)
interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
}

export const accessTokenService = async (jwt_secret: string, organization_code: string, user_id: number): Promise<AuthResponse> => {
  const accessToken = generateAccessToken(jwt_secret, { organization_code, user_id });
  const refreshToken = generateRefreshToken(jwt_secret, { organization_code, user_id });
  return {
    accessToken,
    refreshToken,
  };
};

export const refreshTokenService = async (jwt_secret:string, refreshToken: string): Promise<AuthResponse> => {
    const payload = verifyToken(jwt_secret, refreshToken) as TokenPayload;
    const accessToken = generateAccessToken(jwt_secret, payload);
    return {
      accessToken,
    }
};
