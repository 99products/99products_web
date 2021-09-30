import AOS from "aos";
import "aos/dist/aos.css";
import React, {useEffect, useState} from "react";
import Masonry from "react-masonry-css";
import "./style.css";
import IdeaCard from "../IdeaCard";
import Banner from "../Components/Banner";
import fbConnector from "../Utils/firebaseHelper";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  992: 2,
  700: 2,
  500: 1,
};

const Home = (props) => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    getIdeasList();
    // To initiate animation on scroll
    AOS.init({
      offset: 0,
      easing: "ease-in-out-cubic",
      duration: 1000,
      delay: 100,
    });
  }, []);

  const getIdeasList = async () => {
    const ideasList = await fbConnector.getIdeasList();

    setIdeas([...ideasList]);
  };

  const redirectToForm = () => {
    props.history.push("/form");
  };
  return (
    <div className={ideas.length && "app"}>
      <Banner onClick={redirectToForm} />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="wrapper app-masonry-grid"
        columnClassName="app-masonry-grid_column"
      >
        {ideas.map((idea, i) => (
          <IdeaCard key={i} idea={idea} />
        ))}
      </Masonry>
    </div>
  );
};

export default Home;
