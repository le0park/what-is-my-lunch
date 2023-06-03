import React, {useEffect, useMemo, useState} from 'react';
import {Link, Route, Switch, useHistory, useLocation} from 'react-router-dom';
import {PageTransition} from '@steveeeie/react-page-transition';
import './App.css';
import Question from './Question';
import Result from './Result';
import questions from './static/questions';

const initAnswerState = {
    currentQuestion: 1,
    scores: {},
};

function App() {
    const history = useHistory();
    const location = useLocation();

    const [answerState, setAnswerState] = useState(initAnswerState);

    const filters = useMemo(() => {
        return Object.keys(answerState.scores).map(key => ({ type: key, score: answerState.scores[key] }));
    }, [answerState.scores]);

    const initialize = () => {
        setAnswerState(initAnswerState);
    };

    const acceptAnswer = (type, score) => {
        setAnswerState((old) => console.log(old.scores[type]) || ({
            currentQuestion: old.currentQuestion + 1,
            scores: {
                ...old.scores,
                [type]: (old.scores[type] || 0) + score,
            }
        }));

        if (answerState.currentQuestion === questions.length) {
            history.push("/result");
        } else {
            history.push("/" + (answerState.currentQuestion + 1));
        }
    };

    useEffect(() => {
        if (location.pathname === "/") {
            initialize();
        }
    }, [location?.pathname]);

    return (
        <div className="App">
            <Link to="/">go home</Link>
            <Link to="/1">go first</Link>
            <Route
                render={({location}) => {
                    return (
                        <PageTransition
                            preset="pushLeftFromRight"
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
                                <Route exact path="/result">
                                    <Result filters={filters} />
                                </Route>
                            </Switch>
                        </PageTransition>
                    );
                }}
            />
        </div>
    );
}

export default App;
