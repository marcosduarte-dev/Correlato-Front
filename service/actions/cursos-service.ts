"use server";

export async function get() {
  try {
    const response = await fetch(`${process.env.API_URL}/cursos`, {
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
    const response = await fetch(`${process.env.API_URL}/cursos/ativos`, {
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

export async function getByFaculdade(id: any) {
  try {
    const response = await fetch(`${process.env.API_URL}/cursos/faculdade/${id}`, {
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

export async function create(data: CursosModel) {
  try {

    const dataDTO = {
      nome: data.nome,
      idFaculdade: data.faculdade.id,
    }

    const response = await fetch(`${process.env.API_URL}/cursos`, {
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

export async function edit(data: CursosModel) {
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
    const response = await fetch(`${process.env.API_URL}/cursos/${id}`, {
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