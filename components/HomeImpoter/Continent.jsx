import { getAllContinents } from "@/service/query/continentQuery";
import Image from "next/image";
import Link from "next/link";

const Continent = async () => {
  let { data } = await getAllContinents();
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
        {data?.map((continent, _i) => (
          <Link href={`/continent/${continent?.id}`} key={_i}>
            <Image
              width={300}
              height={300}
              alt="continent image"
              src={continent?.img}
            />
            <h4>{continent?.name}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Continent;
