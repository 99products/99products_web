import AOS from "aos";
import "aos/dist/aos.css";
import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import "./App.css";
import IdeaCard from "./IdeaCard";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  992: 2,
  700: 2,
  500: 1,
};

const App = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    // Getting the ideas list from the spreadsheet.
    getIdeasList();
    // To initiate animation on scroll
    AOS.init({
      offset: 0,
      easing: "ease-in-out-cubic",
      duration: 1000,
      delay: 100,
    });
  }, []);

  const getIdeasList = () => {
    fetch(
      "https://spreadsheets.google.com/feeds/cells/132xxPkI4p_ehAv8AI9hzB5EbcK6CycGaPCDKCR3Xq-o/1/public/full?alt=json"
    )
      .then((res) => res.json())
      .then((json) => {
        const colNames = {};
        const ideasList = [];

        let previousRowId = 0;
        let data;

        const rows = json.feed.entry;
        rows.forEach((rowData) => {
          const cell = rowData.gs$cell;
          const { row, col, inputValue } = cell;
          if (row != 1) {
            // Let's push the row entry
            if (previousRowId != row) {
              data = {};
              ideasList.push(data);
            }
            const colKey = colNames[col].name;
            data[colKey] = cell.inputValue;
            previousRowId = cell.row;
          } else {
            colNames[col] = { name: inputValue };
            previousRowId = 1;
          }
        });
        setIdeas([...ideasList]);
      });
  };

  return (
    <div className={ideas.length && "app"}>
      <header>
        <MDBNavbar expand="lg" light bgColor="white" fixed>
          <MDBContainer fluid>
            <MDBNavbarNav right className="mb-2 mb-lg-0">
              <MDBNavbarItem active data-aos="fade-in-left">
                <MDBNavbarLink
                  aria-current="page"
                  href="/"
                  className="no-padding"
                >
                  <div className="logo_container">
                    <img
                      src={`./assets/logo.jpeg`}
                      className="img-fluid logo"
                    />
                    <h2 className="logo-text">99 Products</h2>
                  </div>
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem className="share_idea-wrapper" data-aos="fade-in-right">
                <MDBBtn
                  className={`m-2 share_idea-btn`}
                  target="_blank"
                  href="https://forms.gle/yVV3Cx2nufF2GW3BA"
                >
                  <MDBIcon fas icon="box-open" size={"lg"} />
                  <span className="submit_idea_label">Unleash Your Idea</span>
                </MDBBtn>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBContainer>
        </MDBNavbar>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="wrapper app-masonry-grid"
          columnClassName="app-masonry-grid_column"
        >
          {ideas.map((idea, i) => (
            <IdeaCard idea={idea} />
          ))}
        </Masonry>
      </header>
    </div>
  );
};

export default App;
