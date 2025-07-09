export interface JwtPayload {
     tenantId: string;
     sub: User;
     exp: number;
     jti: string;
     iat: number;
}

interface User {
     id: number;
     email: string;
     tenantId: string;
}