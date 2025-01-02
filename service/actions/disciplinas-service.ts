"use server";

export async function get() {
  try {
    const response = await fetch(`${process.env.API_URL}/disciplinas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
  try {
    const response = await fetch(`${process.env.API_URL}/disciplinas/ativos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
  try {
    const response = await fetch(`${process.env.API_URL}/disciplinas/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    return {};
  }
}