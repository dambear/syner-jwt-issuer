
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

export const accessTokenService = async (organization_code: string, user_id: number): Promise<AuthResponse> => {
  const accessToken = generateAccessToken({ organization_code, user_id });
  const refreshToken = generateRefreshToken({ organization_code, user_id });
  return {
    accessToken,
    refreshToken,
  };
};

export const refreshTokenService = async (refreshToken: string): Promise<AuthResponse> => {
    const payload = verifyToken(refreshToken) as TokenPayload;
    const accessToken = generateAccessToken(payload);
    return {
      accessToken: accessToken,
    }
};
