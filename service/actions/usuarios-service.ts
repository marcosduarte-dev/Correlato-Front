"use server";

import { parseCookies } from "nookies";

export async function getById(id: any, token: string) {
    console.log("GETBYID")
    try {

        console.log(token)

      const response = await fetch(`${process.env.API_URL}/usuarios/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        cache: "no-store",
      });
  
      const result = await response.json();

      console.log(response)

  
      return result;
    } catch (error) {
      return {};
    }
  }

export async function login(loginDTO: any) {
    const { 'correlato-token': token } = parseCookies();

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