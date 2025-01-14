"use server";

import { cookies } from "next/headers";

export async function get() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('correlato-token')?.value;

  try {
    const response = await fetch(`${process.env.API_URL}/cursos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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

export async function getAtivo() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('correlato-token')?.value;

  try {
    const response = await fetch(`${process.env.API_URL}/cursos/ativos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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

export async function getByFaculdade(id: any) {
  const cookieStore = cookies();
  const token = (await cookieStore).get('correlato-token')?.value;

  try {
    const response = await fetch(`${process.env.API_URL}/cursos/faculdade/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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

export async function create(data: CursosModel) {
  const cookieStore = cookies();
  const token = (await cookieStore).get('correlato-token')?.value;

  try {

    const dataDTO = {
      nome: data.nome,
      idFaculdade: data.faculdade.id,
    }

    const response = await fetch(`${process.env.API_URL}/cursos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(dataDTO),
      cache: "no-store",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    return {};
  }
}

export async function edit(data: CursosModel) {
  const cookieStore = cookies();
  const token = (await cookieStore).get('correlato-token')?.value;

  try {

    const dataDTO = {
      id: data.id,
      nome: data.nome,
      idFaculdade: data.faculdade.id,
    }

    const response = await fetch(`${process.env.API_URL}/cursos/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(dataDTO),
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
    const response = await fetch(`${process.env.API_URL}/cursos/${id}`, {
      method: "DELETE",
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