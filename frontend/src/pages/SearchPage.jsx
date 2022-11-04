import React from "react";
import { useParams } from "react-router-dom";

import IconsSlider from "../components/IconsSlider";
import AnimatedPage from "../components/AnimatedPage";

const SearchPage = () => {
  const { keyword } = useParams();
  console.log(keyword);
  return (
    <AnimatedPage>
      <div className="position-relative">
        <div className="overLay"></div>
        <IconsSlider />
      </div>
      
    </AnimatedPage>
  );
};

export default SearchPage;
