export interface User {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  phoneNumber: string;
  gender: string;
  profileImageUrl: string;
  bio: string;
  role: string;
  status: string;
  emailVerified: string;
  provider: string;
  providerId: string;
  lastLoginAt: Date;
  birth: Date;
  createdAt: Date;
  updatedAt: Date;
}
