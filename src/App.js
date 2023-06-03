import React, {useEffect, useMemo, useState} from 'react';
import {Link, Route, Switch, useHistory, useLocation} from 'react-router-dom';
import {PageTransition} from '@steveeeie/react-page-transition';
import './App.css';
import Question from './Question';
import Result from './Result';
import questions from './static/questions';
import {Col, Container, Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import DialogCard from "./DialogCard";
import {TYPE_FOOD, TYPE_RESTAURANT} from "./variables";

const initAnswerState = {
    type: "",
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

    const setAnswerType = (type) => {
        setAnswerState({
            ...initAnswerState,
            type,
        });
    }

    const acceptAnswer = (type, score) => {
        setAnswerState((old) => ({
            ...old,
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
        <div className="App bg-primary bg-opacity-50">
            <Container className="h-100">
                <Row className="justify-content-center h-100">
                    <Col xs="12" md="6">
                        <Route
                            render={({location}) => {
                                return (
                                    <PageTransition
                                        preset="moveToTopScaleUp"
                                        transitionKey={location.pathname}
                                    >
                                        <Switch location={location}>
                                            <Route exact path="/">
                                                <DialogCard
                                                    header="⭐ 메뉴 정하기 ⭐"
                                                    title="메뉴 정하기"
                                                    content={(<>
                                                        📃 선택지와 함께 오늘의 메뉴를 정해보세요 ~
                                                    </>)}
                                                    footer={(
                                                        <div className="d-flex justify-content-center">
                                                            <Link to="/1" className="me-2">
                                                                <Button variant="primary" onClick={() => setAnswerType(TYPE_RESTAURANT)}>
                                                                    식당 추천받기 (방배)
                                                                </Button>
                                                            </Link> <br/>
                                                            <Link to="/1" >
                                                                <Button variant="primary" onClick={() => setAnswerType(TYPE_FOOD)}>
                                                                    음식 추천받기 (지도 검색)
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    )}
                                                />
                                            </Route>
                                            {questions && questions.map(({text, type, answers}, index) => (
                                                <Route exact path={"/" + (index + 1)} key={type}>
                                                    <DialogCard
                                                        header={"질문 " + (index + 1)}
                                                        content={(
                                                            <Question
                                                                text={text}
                                                                type={type}
                                                                answers={answers}
                                                                last={index === questions.length - 1}
                                                                onNext={acceptAnswer}
                                                            />
                                                        )}
                                                    />
                                                </Route>
                                            ))}
                                            <Route exact path="/result">
                                                <DialogCard
                                                    header="결과"
                                                    content={(
                                                        <Result type={answerState.type} filters={filters} />
                                                    )}
                                                    footer={(
                                                        <Link variant="primary" to="/" component={Button}>
                                                            👈첫페이지로
                                                        </Link>
                                                    )}
                                                />
                                            </Route>
                                        </Switch>
                                    </PageTransition>
                                );
                            }}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
