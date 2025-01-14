"use server";

import { cookies } from "next/headers";

export async function getById(id: any) {
    const cookieStore = cookies();
    const token = (await cookieStore).get('correlato-token')?.value;

    try {
      const response = await fetch(`${process.env.API_URL}/usuarios/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        cache: "no-store",
      });
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      return {};
    }
  }

export async function login(loginDTO: any) {
    try {
      const response = await fetch(`${process.env.API_URL}/usuarios/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDTO),
        cache: "no-store",
      });

      const result = await response.json();

      return result;
    } catch (error) {
      return {};
    }
  }