import React from 'react';

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
    return (
        <div>
            <h3>{text}</h3>
            {answers.map((a, index) => (
                <ul>
                    <li>
                        <label>{a.text}</label>
                        <input type="radio" id={`answer_${index}`} />
                    </li>
                </ul>
            ))}

            {last
                ? (<button type="button">결과보기</button>)
                : (<button type="button">선택</button>)}
        </div>
    );
};

export default Question;
