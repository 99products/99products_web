import AOS from "aos";
import "aos/dist/aos.css";
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

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorNames.length);
    const colorName = colorNames[randomIndex];
    return colorName;
  };

  const getIdeasList = () => {
    fetch("https://spreadsheets.google.com/feeds/cells/132xxPkI4p_ehAv8AI9hzB5EbcK6CycGaPCDKCR3Xq-o/1/public/full?alt=json")
      .then(res => res.json())
      .then(json => {

        const colNames = {};
        const ideasList = [];

        let previousRowId = 0;
        let data;

        const rows = json.feed.entry
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
  }

  return (
    <div className={ideas.length && "app"}>
      {/* <header>
        <MDBNavbar expand="lg" light bgColor="white" fixed>
          <MDBContainer fluid>
            <MDBNavbarToggler
              aria-controls="navbarExample01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <MDBIcon fas icon="bars" />
            </MDBNavbarToggler>
            <div className="collapse navbar-collapse" id="navbarExample01">
              <MDBNavbarNav right className="mb-2 mb-lg-0">
                <MDBNavbarItem active>
                  <MDBNavbarLink aria-current="page" href="#">
                    <div style={{ display: "flex", marginLeft: 10 }}>
                      <img
                        style={{ height: 40, width: 40 }}
                        src={`https://avatars.githubusercontent.com/u/83353242?s=400&u=f5a8e265be0eaf5fc2db2a4437d8685a3acd5c37&v=4`}
                        className="img-fluid"
                      />
                      <h2 style={{ marginLeft: 10 }}>99 Ideas</h2>
                    </div>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </div>
          </MDBContainer>
        </MDBNavbar> */}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="wrapper app-masonry-grid"
        columnClassName="app-masonry-grid_column"
      >
        {ideas.map((idea, i) => <IdeaCard idea={idea} />)}
      </Masonry>
      {/* </header> */}
    </div>
  );
};

export default App;
