import React from "react";
import { ContentLayout } from "@/components/sidebar/content-layout";
import DisciplinasModal from "./modal";
import { get } from "@/service/actions/disciplinas-service";
import { getAtivos } from "@/service/actions/faculdades-service";
import { redirect } from "next/navigation";
import { getAuthToken } from "@/lib/getAuthToken";

async function getData(): Promise<DisciplinasModel[]> {
  return await get();
}

async function getFaculdadesData(): Promise<FaculdadesModel[]> {
  return await getAtivos();
}

const DisciplinasProvider = async () => {
  const data = await getData();
  const faculdadesData = await getFaculdadesData();

  const token = await getAuthToken();

  if (!token) {
    redirect("/login");
  }

  return (
    <ContentLayout title="Disciplinas">
      <DisciplinasModal data={data} faculdades={faculdadesData} />
    </ContentLayout>
  );
};

export default DisciplinasProvider;