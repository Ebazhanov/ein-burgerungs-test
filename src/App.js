import React, {useEffect, useState} from "react";
import quizQuestions from "./api/quizQuestions";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import logo from "./svg/logo.svg";
import "./App.css";

const App = () => {
    const [counter, setCounter] = useState(0);
    const [questionId, setQuestionId] = useState(1);
    const [question, setQuestion] = useState('');
    const [result, setResult] = useState('');
    const [answer, setAnswer] = useState('');
    const [answerOptions, setAnswerOptions] = useState([]);
    const [answersCount, setAnswerCount] = useState({});

    useEffect(() => {
        const shuffledAnswerOptions = quizQuestions.map(question =>
            shuffleArray(question.answers)
        );
        setQuestion(quizQuestions[0].question);
        setAnswerOptions(shuffledAnswerOptions[0]);
    }, []);

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

    const setUserAnswer = answer => {
        setAnswerCount((answersCount[answer] || 0) + 1);
    };

    const setNextQuestion = () => {
        const getCounter = setCounter(counter + 1);
        const getQuestionId = setQuestionId(questionId + 1);
        setCounter(getCounter);
        setQuestionId(getQuestionId);
        setQuestion(quizQuestions[counter].question);
        setAnswerOptions(quizQuestions[counter].answers);
        setAnswer("");
    };

    const getResults = () => {
        const getAnswersCount = answersCount;
        const answersCountKeys = Object.keys(getAnswersCount);
        const answersCountValues = answersCountKeys.map(key => getAnswersCount[key]);
        const maxAnswerCount = Math.max.apply(null, answersCountValues);
        return answersCountKeys.filter(key => getAnswersCount[key] === maxAnswerCount);
    };

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

export default App;
