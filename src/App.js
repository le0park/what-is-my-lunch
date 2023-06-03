import React, {useEffect, useState} from 'react';
import {BrowserRouter, Switch, Route, Link, useHistory} from 'react-router-dom';
import {PageTransition} from '@steveeeie/react-page-transition';
import './App.css';
import Question from "./Question";
import questions from "./static/questions";

function App() {
    const history = useHistory();

    const [answerState, setAnswerState] = useState({
        currentQuestion: 1,
        scores: {},
    });

    const acceptAnswer = (type, score) => {
        setAnswerState((old) => ({
            currentQuestion: old.currentQuestion + 1,
            scores: {
                ...old.scores,
                [type]: old.scores[type] + score,
            }
        }));

        console.log(history);
        history.push("/" + (answerState.currentQuestion + 1));
    };

    return (
        <div className="App">
            <Link to="/">go home</Link>
            <Link to="/1">go first</Link>
            <Route
                render={({location}) => {
                    return (
                        <PageTransition
                            preset="moveToLeftFromRight"
                            transitionKey={answerState.currentQuestion}
                        >
                            <Switch location={location}>
                                {questions && questions.map(({text, type, answers}, index) => (
                                    <Route exact path={"/" + (index + 1)} key={type}>
                                        <Question
                                            text={text}
                                            type={type}
                                            answers={answers}
                                            last={index === questions.length - 1}
                                            onNext={acceptAnswer}
                                        />
                                    </Route>
                                ))}
                            </Switch>
                        </PageTransition>
                    );
                }}
            />
        </div>
    );
}

export default App;
