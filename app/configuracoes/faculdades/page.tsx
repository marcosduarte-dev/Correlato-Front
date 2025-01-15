import React from "react";
import { ContentLayout } from "@/components/sidebar/content-layout";
import FaculdadesModal from "./modal";
import { get } from "@/service/actions/faculdades-service";
import { redirect } from "next/navigation";
import { getAuthToken } from "@/lib/getAuthToken";

async function getData(): Promise<FaculdadesModel[]> {
  return await get();
}

const FaculdadesProvider = async () => {
  const data = await getData();

  const token = await getAuthToken();

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