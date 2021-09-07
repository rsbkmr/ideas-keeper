import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.scss";

// routes
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

// context providers
import { UserProvider } from "./context/User";
import { TokenProvider } from "./context/Token";
import { IdeaProvider } from "./context/Idea";

function App() {
  return (
    <UserProvider>
      <TokenProvider>
        <IdeaProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </BrowserRouter>
        </IdeaProvider>
      </TokenProvider>
    </UserProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
