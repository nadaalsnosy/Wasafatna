import logo from "./../logo.svg";
import AnimatedPage from "../components/AnimatedPage";
import RecipeCard from "../components/RecipeCard";
import IconsSlider from "../components/IconsSlider";

const Home = () => {
  return (
    <>
      <AnimatedPage>
        <div className="position-relative">
          <div className="overLay">{/* <h1>Welcome To WasaFatna</h1> */}</div>
          <IconsSlider />
        </div>
        <div className="container d-flex flex-wrap mt-5">
          <RecipeCard />
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
