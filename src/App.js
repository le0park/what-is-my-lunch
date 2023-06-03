import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import { PageTransition } from '@steveeeie/react-page-transition';
import './App.css';
import Question from "./Question";
import questions from "./static/questions";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Link to="/1">1</Link>
              <Link to="/2">2</Link>
              <Route
                  render={({ location }) => {
                      return (
                          <PageTransition
                              preset="moveToLeftFromRight"
                              transitionKey={location.pathname}
                          >
                              <Switch location={location}>
                                  {questions && questions.map(({ text, type, answers }, index) => (
                                      <Route exact path={"/" + (index + 1)} key={type}>
                                          <Question
                                              text={text}
                                              type={type}
                                              answers={answers}
                                              last={index === questions.length - 1}
                                          />
                                      </Route>
                                  ))}
                              </Switch>
                          </PageTransition>
                      );
                  }}
              />
          </BrowserRouter>
      </div>
  );
}

export default App;
