import Home from "./Home";
import Form from "./Form";
import Admin from "./Admin";
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {positions, Provider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  offset: '30px',
};

const App = () => {
  return (
    <Provider template={AlertTemplate} {...options}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/form" component={Form} />
          <Route exact path="/admin/:user" component={Admin} />
          <Route exact path='/404' component={() => (<h1>404</h1>)} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
