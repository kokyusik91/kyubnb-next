import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// next.js의 dev 환경에서 hot reload에서 에러를 방지하기 위하여, globalThis의 prisma라는 변수에 client를 할당 하였다.
const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;
