import React from 'react';
import PropTypes from 'prop-types';

/**
 * This component consists of a list item with a radio button and label.
 * the checked property is a comparison statement.
 * This value will be a boolean (true or false) based on whether the answer selected is equal to the answer option type.
 * */
export default function AnswerOption({answerType, answer, answerContent, onAnswerSelected}) {
    return (
        <li className="answerOption">
            <input
                type="radio"
                className="radioCustomButton"
                name="radioGroup"
                checked={answerType === answer}
                id={answerType}
                value={answerType}
                disabled={answer}
                onChange={onAnswerSelected}
            />
            <label className="radioCustomLabel" htmlFor={answerType}>
                {answerContent}
            </label>
        </li>
    );
}

AnswerOption.propTypes = {
    answerType: PropTypes.string.isRequired,
    answerContent: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};
