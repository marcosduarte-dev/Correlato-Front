"use server";

export async function get() {
  try {
    const response = await fetch(`${process.env.API_URL}/faculdades`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    console.log(response);

    const result = await response.json();

    return result;
  } catch (error) {
    return [];
  }
}

export async function create(data: FaculdadesModel) {
  try {
    const response = await fetch(`${process.env.API_URL}/faculdades`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  try {
    const response = await fetch(`${process.env.API_URL}/faculdades/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
  try {
    const response = await fetch(`${process.env.API_URL}/faculdades/${id}`, {
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