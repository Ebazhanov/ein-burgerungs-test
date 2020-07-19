import React from 'react';
import PropTypes from 'prop-types';

export default function QuestionCount({counter, total}) {
    return (
        <div className="questionCount">
            Aufgabe <span>{counter}</span> von <span>{total}</span>
        </div>
    );
}

QuestionCount.propTypes = {
    counter: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};
