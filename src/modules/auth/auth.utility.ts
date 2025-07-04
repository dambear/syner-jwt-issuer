// src/utils/jwtUtils.ts

import jwt, { JwtPayload } from "jsonwebtoken";

// Constants
console.log("JWT_SECRET in process.env:", process.env.JWT_SECRET);
const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined in environment variables.");
}

// Types
export interface TokenPayload {
  organization_code: string;
  user_id: number;
}

// Generate Access Token (Short-lived)
export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "15m", 
  });
};

// Generate Refresh Token (Long-lived)
export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Verify Token

export const verifyToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

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
