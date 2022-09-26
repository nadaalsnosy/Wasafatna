import logo from "./../logo.svg";
import AnimatedPage from "../components/AnimatedPage";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  return (
    <>
      <AnimatedPage>
        <div className="container d-flex flex-wrap">
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>
      </AnimatedPage>
    </>
  );
};

export default Home;
