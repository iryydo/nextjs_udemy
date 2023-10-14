import { PrismaClient, Cuisine, Location, Review, PRICE } from "@prisma/client";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  slug: string;
  location: Location;
  price: PRICE;
  reviews: Review[];
}

const prisma = new PrismaClient();

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      slug: true,
      location: true,
      price: true,
      reviews: true
    },
  });
  return restaurants;
};

const fetchReviews = async () => {
  const reviews = prisma.review.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      text: true,
      rating: true,
      restaurant_id: true,
      restaurant: true,
      user_id: true,
      user: true,
    },
  });

  return reviews;
};

//213ikjn35021c
export default async function Home() {
  const restaurants = await fetchRestaurants();
  const reviews = await fetchReviews();
  console.log("REVIEWS: ", reviews)
  return (
    <>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} key={restaurant.id}/>
        ))}
      </div>
    </>
  );
}
