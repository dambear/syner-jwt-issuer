// src/utils/jwtUtils.ts

import jwt, { JwtPayload } from "jsonwebtoken";


// Types


export interface TokenPayload {
  organization_code: string;
  user_id: number;
}

// Generate Access Token (Short-lived)
export const generateAccessToken = (jwt_secret: string, payload: TokenPayload): string => {
  return jwt.sign(payload, jwt_secret, {
    expiresIn: "15m", 
  });
};

// Generate Refresh Token (Long-lived)
export const generateRefreshToken = (jwt_secret: string, payload: TokenPayload): string => {
  return jwt.sign(payload, jwt_secret, {
    expiresIn: "7d",
  });
};

// Verify Token

export const verifyToken = (jwt_secret: string, token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, jwt_secret) as JwtPayload;

    // Check for required fields
    if (
      typeof decoded === "object" &&
      "organization_code" in decoded &&
      "user_id" in decoded
    ) {
      return {
        organization_code: decoded.organization_code as string,
        user_id: Number(decoded.user_id), 
      };
    }

    throw new Error("Invalid token payload structure");
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
