import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransition} from 'react-transition-group';

const Result = ({quizResult}) => {
    return (
        <CSSTransition
            className="container result"
            component="div"
            //transitionName="fade"
            //transitionEnterTimeout={800}
            //transitionLeaveTimeout={500}
            //transitionAppear
            //transitionAppearTimeout={500}
        >
            <div>
                -> <strong>{quizResult}</strong>!
            </div>
        </CSSTransition>
    );
}

Result.propTypes = {
    quizResult: PropTypes.string.isRequired
};

export default Result;
