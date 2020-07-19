import React, {useEffect, useState} from "react";
import quizQuestions from "../api/quizQuestions";
import Quiz from "../components/Quiz";
import Result from "../components/Result";
import logo from "../asserts/svg/logo.svg";
import "./App.css";

export default function App() {

    const [counter, setCounter] = useState(0);
    const [questionId, setQuestionId] = useState(1);
    const [question, setQuestion] = useState("");
    const [result, setResult] = useState("");
    const [answer, setAnswer] = useState("");
    const [answerOptions, setAnswerOptions] = useState([]);
    const [answersCount, setAnswerCount] = useState({});

    useEffect(() => {
        const shuffledAnswerOptions = quizQuestions.map(question =>
            shuffleArray(question.answers)
        );
        setQuestion(quizQuestions[counter].question);
        setAnswerOptions(shuffledAnswerOptions[counter]);
    }, [counter]);

    const shuffleArray = array => {
        var currentIndex = array.length,
            temporaryValue,
            randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };

    const handleAnswerSelected = event => {
        setUserAnswer(event.currentTarget.value);
        if (questionId < quizQuestions.length) {
            setTimeout(() => setNextQuestion(), 300);
        } else {
            setTimeout(() => setResults(getResults()), 300);
        }
    };

    /**
     * We’re setting the answer based on the user’s selection, which is the first
     * instance of changing state based on user actions. The value being passed
     * in as the answer parameter on line 1, is the value of the selected answer.
     * */
    const setUserAnswer = answer => {
        /**
         * This is so we can access the previous state, which will be passed into the
         * function as the first parameter. setAnswerCount is the primary method used to
         * trigger UI updates from event handlers and server request callbacks.
         * In React we should treat state as if it is unable to be changed (immutable).
         * This is why we’re creating a new object. This object has the original
         * properties of answersCount (through the use of the spread syntax)
         * merged with the new answerCount value. We have now updated the state without mutating it directly.
         * */
        setAnswerCount({...answersCount, [answer]: (answersCount[answer] || 0) + 1});
        setAnswer(answer);
    };

    /**
     * this will update our state to display the next question
     * */
    const setNextQuestion = () => {
        /**
         * Here we increment the counter and questionId state, by first creating the variables,
         * then assigning them via setCounter. We’re also updating the question and answerOption
         * state based on the counter variable. We now have a somewhat functional app!
         * When you select an answer it should update the state accordingly and display the next question.
         * */
        setCounter(counter + 1);
        setQuestionId(questionId + 1);
        setAnswer("");
    };


    const getResults = () => {
        setAnswerCount(answersCount);
        const answersCountKeys = Object.keys(answersCount);
        const answersCountValues = answersCountKeys.map(key => answersCount[key]);
        const maxAnswerCount = Math.max.apply(null, answersCountValues);
        return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
    };

    /**
     * This function receives the result from getResults which is an array, and checks to see if that array
     * has one value. If so we assign that value via setState. If the array has more or less than
     * one value that means there is no conclusive answer. So we set the result as Undetermined.
     * */
    const setResults = result => {
        if (result.length === 1) {
            setResult(result[0]);
        } else {
            setResult("Undetermined");
        }
    };

    const renderQuiz = () => {
        return (
            <Quiz
                answer={answer}
                answerOptions={answerOptions}
                questionId={questionId}
                question={question}
                questionTotal={quizQuestions.length}
                onAnswerSelected={handleAnswerSelected}
            />
        );
    };

    const renderResult = () => {
        return <Result quizResult={result}/>;
    };

    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Ein bürgerungs test</h2>
            </div>
            {result ? renderResult() : renderQuiz()}
        </div>
    );
};
