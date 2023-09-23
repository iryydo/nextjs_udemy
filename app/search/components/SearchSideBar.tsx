import Link from "next/link";
import { SearchParams } from "../page";
import { PRICE } from "@prisma/client";

export default function SearchSideBar({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: SearchParams;
}) {
  return (
    <div className="w-1/5">
      <div className="border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {locations.map((location) => {
          return (
            <div>
              <Link
                href={{
                  pathname: "/search",
                  query: {
                    ...searchParams,
                    city: location.name,
                  },
                }}
                className="font-light text-reg capitalize"
                key={location.id}
              >
                {location.name}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => {
          return (
            <div>
              <Link
                href={{
                  pathname: "/search",
                  query: {
                    ...searchParams,
                    cuisine: cuisine.name,
                  },
                }}
                className="font-light text-reg capitalize"
                key={cuisine.id}
              >
                {cuisine.name}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                price: PRICE.CHEAP,
              },
            }}
            className="border w-full text-reg font-light rounded-l p-2"
          >
            $
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                price: PRICE.REGULAR,
              },
            }}
            className="border-r border-t border-b w-full text-reg font-light p-2"
          >
            $$
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                price: PRICE.EXPENSIVE,
              },
            }}
            className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
          >
            $$$
          </Link>
        </div>
      </div>
    </div>
  );
}
