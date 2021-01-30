import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createFFmpeg } from "@ffmpeg/ffmpeg";

//common components
import Loader from "./components/common/Loader";
import SideNav from "./components/side nav comp/side nav/Index";
import TopNavBar from "./components/top nav comp/top nav/Index";

//from top navbar
import Home from "./components/top nav comp/Home";
import ErrorMessage from "./components/common/ErrorMessage";

const About = lazy(() => import("./components/top nav comp/About"));
const Info = lazy(() => import("./components/top nav comp/info"));

//from sidebar
const Crop = lazy(() => import("./components/side nav comp/crop"));
const Compress = lazy(() => import("./components/side nav comp/compress"));
const Rotate = lazy(() => import("./components/side nav comp/rotate"));
const Gif = lazy(() => import("./components/side nav comp/Gif/Gif"));

const ffmpeg = createFFmpeg({ log: true });

const App = () => {
  const [ready, setReady] = useState(false);

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  const CustomRoute = ({ children, ...props }) => (
    <Route
      exact
      {...props}
      render={() =>
        ready ? (
          children
        ) : (
          <ErrorMessage message="Please wait for few seconds" />
        )
      }
    />
  );

  return (
    <div className="App">
      <Router>
        <TopNavBar />
        <SideNav />
        <div className="main">
          <div className="main_container">
            <Switch>
              <Suspense fallback={<Loader />}>
                <Route path="/" exact component={Home} />

                <Route path="/about" exact component={About} />

                <Route path="/info" exact component={Info} />

                <CustomRoute path="/crop">
                  <Crop ffmpeg={ffmpeg} />
                </CustomRoute>

                <CustomRoute path="/compress">
                  <Compress ffmpeg={ffmpeg} />
                </CustomRoute>

                <CustomRoute path="/rotate">
                  <Rotate ffmpeg={ffmpeg} />
                </CustomRoute>

                <CustomRoute path="/gif">
                  <Gif ffmpeg={ffmpeg} />
                </CustomRoute>
              </Suspense>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
