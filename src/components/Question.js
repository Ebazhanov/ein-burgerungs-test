import React from 'react';
import PropTypes from 'prop-types';

export default function Question({content}) {
    return <h2 className="question">{content}</h2>;
}

Question.propTypes = {
    content: PropTypes.string.isRequired
};
