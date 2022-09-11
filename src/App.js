import './App.css';
import Header from './components/Header/Header';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';
import Quiz from './Pages/Quiz/Quiz';
import Result from './Pages/Result/Result';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState("")
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);

  // by default category and difficulty going to be empty
  const fetchQuestions = async( category='', difficulty='') => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    )
    
    setQuestions(data.results)
    console.log(data.results)
  }

  return (
    <BrowserRouter>
      <div className="app" >
        <Header />
        <Routes>
          <Route path='/' exact element={<Home name={name} setName={setName} fetchQuestions={fetchQuestions} />} />
          <Route path='/quiz' exact element={
            <Quiz 
              name={name} 
              questions={questions}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
            />
            } />
          <Route path='/result' exact element={<Result name={name} score={score} />} />
        </Routes>
      </div>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
