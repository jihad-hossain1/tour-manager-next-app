import PageContainer from '@/components/ui/pageContainer'
import CountryForm from '../_compo/CountryForm'
import { getAllContinents } from '@/service/query/continentQuery';

const AddwithUpdatepage = async ({ params }) => {
  const id = params?.id;
  const continents = await getAllContinents()

  return (
    <PageContainer>
      <CountryForm id={id} continents={continents?.data} />
    </ PageContainer>
  )
}

export default AddwithUpdatepage