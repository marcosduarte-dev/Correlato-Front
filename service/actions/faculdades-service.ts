"use server";

import { cookies } from "next/headers";

export async function get() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('correlato-token')?.value;

  try {
    const response = await fetch(`${process.env.API_URL}/faculdades`, {
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

export async function getAtivos() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('correlato-token')?.value;

  try {
    const response = await fetch(`${process.env.API_URL}/faculdades/ativos`, {
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

export async function create(data: FaculdadesModel) {
  const cookieStore = cookies();
  const token = (await cookieStore).get('correlato-token')?.value;

  try {
    const response = await fetch(`${process.env.API_URL}/faculdades`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    return {};
  }
}

export async function edit(data: FaculdadesModel) {
  const cookieStore = cookies();
  const token = (await cookieStore).get('correlato-token')?.value;

  try {
    const response = await fetch(`${process.env.API_URL}/faculdades/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    return {};
  }
}

export async function deleteEntity(id: any) {
  const cookieStore = cookies();
  const token = (await cookieStore).get('correlato-token')?.value;

  try {
    const response = await fetch(`${process.env.API_URL}/faculdades/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      cache: "no-store",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    return {};
  }
}