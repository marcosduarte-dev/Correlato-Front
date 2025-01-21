"use server";

import { cookies } from "next/headers";

export async function get() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('correlato-token')?.value;

  try {
    const response = await fetch(`${process.env.API_URL}/disciplinas`, {
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

export async function getByCurso(id: any) {
  const cookieStore = cookies();
  const token = (await cookieStore).get('correlato-token')?.value;

  try {
    const response = await fetch(`${process.env.API_URL}/disciplinas/curso/${id}`, {
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

export async function getAtivos() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('correlato-token')?.value;

  try {
    const response = await fetch(`${process.env.API_URL}/disciplinas/ativos`, {
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

export async function create(data: DisciplinasModel) {
  const cookieStore = cookies();
  const token = (await cookieStore).get('correlato-token')?.value;

  try {

    const dataDTO = {
      nome: data.nome,
      codDisciplina: data.codDisciplina,
      idCurso: data.curso.id,
      cargaHoraria: data.cargaHoraria,
      ementa: data.ementa,
      programa: data.programa
    }

    const response = await fetch(`${process.env.API_URL}/disciplinas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
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

export async function edit(data: DisciplinasModel) {
  const cookieStore = cookies();
  const token = (await cookieStore).get('correlato-token')?.value;

  try {

    const dataDTO = {
      id: data.id,
      nome: data.nome,
      codDisciplina: data.codDisciplina,
      idCurso: data.curso.id,
      cargaHoraria: data.cargaHoraria,
      ementa: data.ementa,
      programa: data.programa
    }

    const response = await fetch(`${process.env.API_URL}/disciplinas/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
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
    const response = await fetch(`${process.env.API_URL}/disciplinas/${id}`, {
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