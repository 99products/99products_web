import {Component} from "react";
import fbConnector from "../Utils/firebaseHelper";

class Admin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {user} = this.props.match.params;
    fbConnector
      .getUserPermissions(user)
      .then((permissions) => {
        //user exist
        const ideasList = fbConnector.getIdeasList().then((ideasList) => {
          console.log("LIST:::", ideasList);
        });
      })
      .catch((err) => {
        this.props.history.push("/Error");
      });
  }

  render() {
    return <div />;
  }
}

export default Admin;
