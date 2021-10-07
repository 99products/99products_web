import {useEffect, useState, useRef} from "react";
import fbConnector from "../Utils/firebaseHelper";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import "./style.css";
import Modal from "../Components/Modal";

const Admin = (props) => {
  const inlineStyle = {
    titleLabel: {width: "50%", fontSize: "15px"},
    effortLabel: {
      width: "20%",
      fontSize: "15px",
      textAlign: "center",
    },
    categoryLabel: {
      width: "30%",
      fontSize: "15px",
      textAlign: "center",
    },
    badgeDiv: {cursor: "pointer"},
    buttonStyle: {
      width: "50px",
      height: "50px",
      background: "#4dbecf",
      border: "0",
      borderRadius: "25px",
      cursor: "pointer",
      color: "white",
      textAlign: "center",
    },
  };

  const cacheRef = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );

  const [ideasList, setIdeasList] = useState([]);
  const [showModal, setModalState] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const {user} = props.match.params;
    fbConnector
      .getUserPermissions(user)
      .then((permissions) => {
        getIdeasList();
      })
      .catch((err) => {
        this.props.history.push("/Error");
      });
  }, []);

  const getIdeasList = async () => {
    const ideasList = await fbConnector.getIdeasList();
    setIdeasList([...ideasList]);
  };

  const showDescription = (index) => {
    setSelectedIndex(index);
    setModalState(true);
  };

  const createHeaders = () => {
    return (
      <div className="header-container">
        <h3>List of Ideas so far</h3>
      </div>
    );
  };

  const closeModal = () => {
    setModalState(false);
  };

  const createRow = (index) => {
    const ideas = ideasList[index];
    return (
      <div className="idea-details-row">
        <div className="idea-row-left-container">
          <div className="details-container">
            <span style={inlineStyle.titleLabel}>{ideas.Title}</span>
            <span style={inlineStyle.categoryLabel}>{ideas.Category}</span>
            <span style={inlineStyle.effortLabel}>{ideas.EffortSize}</span>
          </div>
          <div
            style={inlineStyle.badgeDiv}
            onClick={() => showDescription(index)}
          >
            <span className="badge badge-pill badge-primary">Description</span>
          </div>
        </div>
        <button type="button" style={inlineStyle.buttonStyle}>
          <i className="fas fa-edit"></i>
        </button>
      </div>
    );
  };

  return (
    <div className="admin-table">
      {createHeaders()}
      <Modal isOpen={showModal} closeModal={closeModal} ideaObj={ideasList[selectedIndex]}/>
      <AutoSizer>
        {({width, height}) => (
          <List
            width={width}
            height={height - 70}
            rowCount={ideasList.length}
            rowHeight={cacheRef.current.rowHeight}
            deferredMeasurementCache={cacheRef.current}
            overscanRowCount={5}
            rowRenderer={({key, index, style, parent}) => {
              return (
                <CellMeasurer
                  key={key}
                  cache={cacheRef.current}
                  parent={parent}
                  columnIndex={0}
                  rowIndex={index}
                >
                  <div
                    key={key}
                    style={{
                      ...style,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {createRow(index)}
                  </div>
                </CellMeasurer>
              );
            }}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default Admin;
