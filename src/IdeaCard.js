import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBIcon,
} from "mdb-react-ui-kit";

const colorNames = [
  "adele_s-second-love",
  "abstract-truth",
  "instagram-story",
  "mars_conquest",
  "director_s-cut",
  "fate-believes",
  "unexpected_erection",
  "square_donut",
  "real-estate-agent",
  "red-kit",
  "soda",
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colorNames.length);
  const colorName = colorNames[randomIndex];
  return colorName;
};

const isDisabledBtn = (value) => (!value ? "disabled-btn" : "");

const IdeaCard = ({idea}) => {
  const playStoreLink = idea["Play Store"];
  const appStoreLink = idea["App Store"];
  const webLink = idea["Web"];

  return (
    <MDBCard style={{borderRadius: ".8rem"}} data-aos="zoom-in-up">
      <div
        style={{
          borderTopLeftRadius: ".8rem",
          borderTopRightRadius: ".8rem",
        }}
        className={`shadow-3-strong ${getRandomColor()} white-text d-flex justify-content-center align-items-center flex-column p-4`}
      >
        <h3 className="project-title">{`${idea.Title}`}</h3>
      </div>
      <MDBCardBody className="text-center">
        <MDBCardText>{idea.Description}</MDBCardText>
        <div className="text-center">
          <a href={idea.Github} target="_blank">
            <MDBIcon
              fab
              icon="github"
              size="2x"
              className="m-2 raise"
              style={{color: "#333333"}}
            />
          </a>
          <hr />
          {/* {
              <div style={{ marginTop: 10 }}>
                <MDBBtn
                  rounded
                  color="success"
                  style={{ boxShadow: "0px 8px 14px -6px #00b749" }}
                >
                  View More
                </MDBBtn>
              </div>
            } */}
          <MDBBtn
            className={`m-2 google_play-btn ${isDisabledBtn(playStoreLink)}`}
            disabled={!playStoreLink}
            href={playStoreLink}
            target="_blank"
          >
            <MDBIcon fab icon="google-play" size={"lg"} />
          </MDBBtn>
          <MDBBtn
            className={`m-2 app_store-btn ${isDisabledBtn(appStoreLink)}`}
            disabled={!appStoreLink}
            href={appStoreLink}
            target="_blank"
          >
            <MDBIcon fab icon="apple" size={"lg"} />
          </MDBBtn>
          <MDBBtn
            className={`m-2 web_link-btn ${isDisabledBtn(webLink)}`}
            disabled={!webLink}
            href={webLink}
            target="_blank"
          >
            <MDBIcon icon="link" size={"lg"} />
          </MDBBtn>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default IdeaCard;
