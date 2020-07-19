import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';

export default function Quiz({answer, questionId, onAnswerSelected, questionTotal, question, answerOptions}) {
    function renderAnswerOptions(key) {
        return (
            <AnswerOption
                key={key.content}
                answerContent={key.content}
                answerType={key.type}
                answer={answer}
                questionId={questionId}
                onAnswerSelected={onAnswerSelected}
            />
        );
    }

    return (
        <div key={questionId} className="container">
            <QuestionCount counter={questionId}
                           total={questionTotal}/>
            <Question content={question}/>
            <ul className="answerOptions">
                {answerOptions.map(renderAnswerOptions)}
            </ul>
        </div>
    );
}

Quiz.propTypes = {
    answer: PropTypes.string.isRequired,
    answerOptions: PropTypes.array.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};
