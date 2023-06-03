import React, {useState} from 'react';
import Button from "react-bootstrap/Button";

/**
 *
 * @param {string} text
 * @param {string} type
 * @param {object[]} answers
 * @param {string} answers.text
 * @param {number} answers.score
 * @param {function} onNext
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

    return (
        <div>
            <h3>{text}</h3>
            {answers.map((a, index) => (
                <ul>
                    <li>
                        <label>{a.text}</label>
                        <input type="radio" name="answer" onClick={() => setScore(a.score)}/>
                    </li>
                </ul>
            ))}

            <Button variant="primary" onClick={() => onNext(type, score)}>
                {last ? '결과보기' : '다음'}
            </Button>
        </div>
    );
};

export default Question;
