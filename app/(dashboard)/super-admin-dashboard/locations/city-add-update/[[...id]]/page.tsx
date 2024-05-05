import PageContainer from "@/components/ui/pageContainer";
import CityForm from "../_Form/CityForm";
import { getCountries } from "@/service/query/countryQuery";
import { getDivisions } from "@/service/query/divisionQuery";

const CityCreateUpdatePage = async ({ params }) => {
  const id = params?.id;

  const countries = await getCountries();
  const divisions = await getDivisions();

  return (
    <PageContainer>
      <CityForm
        countries={countries?.data}
        divisions={divisions?.data}
        id={id}
      />
    </PageContainer>
  );
};

export default CityCreateUpdatePage;
