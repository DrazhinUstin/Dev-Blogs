import { Role } from '@prisma/client';

declare module 'next-auth' {
  interface User {
    role: Role;
  }
}
