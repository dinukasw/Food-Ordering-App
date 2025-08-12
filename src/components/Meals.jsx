
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";

const requestConfig = {};

const Meals = () => {
    const {data:loadedMeals, isLoading, error} = useHttp('http://localhost:3000/meals', requestConfig, [])

    return (
        <ul id="meals">
            {loadedMeals.map((meals) => (
                <MealItem key={meals.id} meal={meals} />
            ))}
        </ul>
    );
};

export default Meals;
