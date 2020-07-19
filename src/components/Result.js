import React from 'react';
import PropTypes from 'prop-types';

export default function Result({quizResult}) {
    return (
        <div className="container result">
            -> <strong>{quizResult}</strong>!
        </div>
    );
}

Result.propTypes = {
    quizResult: PropTypes.string.isRequired
};
