import PageContainer from '@/components/ui/pageContainer'
import CountryForm from '../_compo/CountryForm'
import { getAllContinents } from '@/service/query/continentQuery';
import { getCountry } from "@/service/query/countryQuery";
import { CountryType } from "@/helpers/types";

const AddwithUpdatepage = async ({ params }) => {
  const id = params?.id;

  const continents = await getAllContinents();

  let content: {
    data: CountryType;
  };

  if (id) {
    const response = await getCountry(id[0]);
    content = response;
  }

  return (
    <PageContainer>
      <CountryForm
        id={id}
        continents={continents?.data}
        country={content?.data}
      />
    </PageContainer>
  );
};

export default AddwithUpdatepage