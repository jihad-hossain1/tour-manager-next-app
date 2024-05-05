import PageContainer from "@/components/ui/pageContainer";
import CityForm from "../_Form/CityForm";
import { getCountries } from "@/service/query/countryQuery";
import { getDivisions } from "@/service/query/divisionQuery";
import { CityType } from "@/helpers/types";
import { getCity } from "@/service/query/cityQuery";

const CityCreateUpdatePage = async ({ params }) => {
  const id = params?.id;

  const countries = await getCountries();
  const divisions = await getDivisions();

  let initialData;

  if (id) {
    const response = await getCity(id[0]);
    initialData = response?.getCity;
  }

  return (
    <PageContainer>
      <CityForm
        countries={countries?.data}
        divisions={divisions?.data}
        id={id}
        city={initialData}
      />
    </PageContainer>
  );
};

export default CityCreateUpdatePage;