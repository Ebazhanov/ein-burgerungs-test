import React from 'react';
import PropTypes from 'prop-types';

const Question = ({content}) => {
    return <h2 className="question">{content}</h2>;
}

Question.propTypes = {
    content: PropTypes.string.isRequired
};

export default Question;
