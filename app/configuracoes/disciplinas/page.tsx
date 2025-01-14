import React from "react";
import { ContentLayout } from "@/components/sidebar/content-layout";
import DisciplinasModal from "./modal";
import { get } from "@/service/actions/disciplinas-service";
import { getAtivos } from "@/service/actions/faculdades-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getData(): Promise<DisciplinasModel[]> {
  return await get();
}

async function getFaculdadesData(): Promise<FaculdadesModel[]> {
  return await getAtivos();
}

const DisciplinasProvider = async () => {
  const data = await getData();
  const faculdadesData = await getFaculdadesData();

  const cookieStore = cookies();
  const token = (await cookieStore).get('correlato-token')?.value;

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