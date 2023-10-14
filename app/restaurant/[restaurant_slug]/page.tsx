import Header from './components/Header'
import RestaurantNavBar from './components/RestaurantNavBar'
import Title from './components/Title'
import Rating from './components/Rating'
import Description from './components/Description'
import Images from './components/Images'
import Reviews from './components/Reviews'
import ReservationCard from './components/ReservationCard'
import { PrismaClient, Review } from '@prisma/client'

interface Restaurant {
    id: number;
    name: string;
    images: string[];
    description: string;
    slug: string;
    reviews: Review[]
}

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            id: true,
            name: true,
            images: true,
            description: true,
            slug: true,
            reviews: true
        }
    })

    if (!restaurant) {
        throw new Error();
    }
    return restaurant
}

export default async function RestaurantDetails(props: any) {
    let restaurant_slug = props.params.restaurant_slug;
    const restaurant = await fetchRestaurantBySlug(restaurant_slug);

    console.log("restaurant", restaurant)
    return (
        <>
            <Header name={restaurant.name} />
            {/* DESCRIPTION PORTION */}
            <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
                <div className="bg-white w-[70%] rounded p-3 shadow">
                    <RestaurantNavBar slug={restaurant.slug} />
                    <Title name={restaurant.name} />
                    <Rating />
                    <Description description={restaurant.description} />
                    <Images images={restaurant.images} />
                    <Reviews reviews={restaurant.reviews}/>
                </div>
                <div className="w-[27%] relative text-reg">
                    <ReservationCard />
                </div>
            </div>
        </>
    )
}