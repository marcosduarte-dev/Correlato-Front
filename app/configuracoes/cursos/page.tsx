import React from "react";
import { ContentLayout } from "@/components/sidebar/content-layout";
import { get } from "@/service/actions/cursos-service";
import CursosModal from "./modal";
import { getAtivos } from "@/service/actions/faculdades-service";
import { redirect } from "next/navigation";
import { getAuthToken } from "@/lib/getAuthToken";

async function getData(): Promise<CursosModel[]> {
  return await get();
}

async function getFaculdadesData(): Promise<FaculdadesModel[]> {
    return await getAtivos();
  }

const CursosProvider = async () => {
  const data = await getData();
  const faculdadesData = await getFaculdadesData();

  const token = await getAuthToken();

  if (!token) {
    redirect("/login");
  }

  return (
    <ContentLayout title="Cursos">
      <CursosModal data={data} faculdades={faculdadesData} />
    </ContentLayout>
  );
};

export default CursosProvider;
