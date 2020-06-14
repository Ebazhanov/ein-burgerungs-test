import React from 'react';
import PropTypes from 'prop-types';

const AnswerOption = ({answerType, answer, answerContent, onAnswerSelected}) => {
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

export default AnswerOption;
