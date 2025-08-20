import { JWTPayload } from "jose";

export interface User {
  firstName: string;
  userName: string;
  lastName: string;
  email: string;
  avatar: string;
  jwtClaim: JWTPayload | undefined;
}

export interface Reserve {
  id: number;
  bookingDate: string;
  persianDate: string;
  startTime: string;
  endTime: string;
  userId: number;
  userName: string;
  avatarUrl: string;
}
