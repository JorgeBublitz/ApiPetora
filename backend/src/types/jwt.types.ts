export interface JwtPayload {
  gerenteId: string;
  email: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

