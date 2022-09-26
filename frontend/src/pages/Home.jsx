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

        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </AnimatedPage>
    </>
  );
};

export default Home;
