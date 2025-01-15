import { ContentLayout } from '@/components/sidebar/content-layout';
import { get } from '@/service/actions/analise-equivalencias-service';
import Data from './data';
import { getAuthToken } from '@/lib/getAuthToken';
import { redirect } from 'next/navigation';

async function getData(): Promise<AnaliseEquivalenciasModel[]> {
  return await get();
}

export default async function AnaliseEquivalencias() {

  const analisesEquivalencias = await getData();

  const token = await getAuthToken();

  if (!token) {
    redirect("/login");
  }

  return (
    <ContentLayout title="Analise Equivalencias">
      <Data data={analisesEquivalencias} />
    </ContentLayout>
  );
}
