import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};

const Meals = () => {
    const {
        data: loadedMeals,
        isLoading,
        error,
    } = useHttp("http://localhost:3000/meals", requestConfig, []);

    if (isLoading) {
        return <p className="center">Fetching Data.....</p>;
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error} />;
    }

    return (
        <ul id="meals">
            {loadedMeals.map((meals) => (
                <MealItem key={meals.id} meal={meals} />
            ))}
        </ul>
    );
};

export default Meals;
