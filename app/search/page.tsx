import Navbar from '../components/Navbar'
import Header from './components/Header'
import SearchSideBar from './components/SearchSideBar'
import RestaurantCard from './components/RestaurantCard'
import { PRICE, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const fetchRestaurantsByCity = async function (searchParams: SearchParams) {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true
  }

  const where: any = {};

  // if (!searchParams.city) return prisma.restaurant.findMany({ select })

  if(searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city
      }
    }
    where.location = location;
  }

  if(searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine
      }
    }
    where.cuisine = cuisine;
  }

  if(searchParams.price) {
    const price = {
      equals: searchParams.price
    }
    where.price = price;
  }

  console.log("WHERE:", where);

  return prisma.restaurant.findMany({
    where,
    select
  })
}

const fetchLocations = async () => {
  return prisma.location.findMany()
}

const fetchCuisines = async () => {
  return prisma.cuisine.findMany()
}

export interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

export default async function Search ({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const restaurants = await fetchRestaurantsByCity(searchParams);
  const location = await fetchLocations();
  const cuisine = await fetchCuisines();

  return (
    <main>
      <Navbar />
      <Header />
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
        <SearchSideBar searchParams={searchParams} locations={location} cuisines={cuisine}/>
        <div className='w-5/6 ml-5'>
          {restaurants.length ? (
            restaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <p>Sorry, no restaurants found in the area.</p>
          )}
        </div>
      </div>
    </main>
  )
}
