"use server";

import { cookies } from "next/headers";

export async function get() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('correlato-token')?.value;

  try {
    const response = await fetch(`${process.env.API_URL}/analise-equivalencias`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const result = await response.json();

    return result;
  } catch (error) {
    return [];
  }
}