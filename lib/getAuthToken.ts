// utils/getAuthToken.ts
import { cookies } from 'next/headers';

export async function getAuthToken() {
  const cookieStore = cookies();
  return (await cookieStore).get('correlato-token')?.value;
}