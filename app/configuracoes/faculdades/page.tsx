import React from "react";
import { ContentLayout } from "@/components/sidebar/content-layout";
import FaculdadesModal from "./modal";
import { get } from "@/service/actions/faculdades-service";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function getData(): Promise<FaculdadesModel[]> {
  return await get();
}

const FaculdadesProvider = async () => {
  const data = await getData();

  const cookieStore = cookies();
  const token = (await cookieStore).get('correlato-token')?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <ContentLayout title="Faculdades">
      <FaculdadesModal data={data} />
    </ContentLayout>
  );
};

export default FaculdadesProvider;