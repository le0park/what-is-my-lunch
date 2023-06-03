import React, {useCallback, useState} from 'react';
import Button from "react-bootstrap/Button";
import {Alert, ToggleButton} from "react-bootstrap";

/**
 *
 * @param {string} text
 * @param {string} type
 * @param {object[]} answers
 * @param {string} answers.text
 * @param {number} answers.score
 * @param {function} onNext
 * @param {boolean} last
 * @returns {JSX.Element}
 * @constructor
 */
const Question = ({
    text = "",
    type = "",
    answers = [],
    onNext = (type, score) => console.error("onNext not defined: " + type + ", " + score),
    last = false
                  }) => {
    const [score, setScore] = useState(0);
    const [alert, setAlert] = useState(false);

    const handleNext = useCallback(() => {
        if (score === 0) {
            setAlert(true);
        } else {
            onNext(type, score);
        }
    }, [onNext, score, type]);

    return (
        <div>
            {alert && (<Alert variant="danger">
                응답을 먼저 선택해주세요!
            </Alert>)}

            <h4 className="mb-4">{text}</h4>
            <div className="d-flex flex-column mb-3">
                {answers.map((a, idx) => (
                    <>
                        <ToggleButton
                            key={idx}
                            id={`answer-${idx}`}
                            type="radio"
                            variant="outline-success"
                            name="answer"
                            value={a.score}
                            checked={score === a.score}
                            onChange={() => setScore(a.score)}
                        >
                            {a.text}
                        </ToggleButton>
                    </>
                ))}
            </div>
            <Button variant="primary" onClick={handleNext}>
                {last ? '결과보기' : '다음'}
            </Button>
        </div>
    );
};

export default Question;
