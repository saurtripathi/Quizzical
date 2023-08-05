import { useState, useEffect } from 'react'
import { decode } from 'html-entities';
import { nanoid } from 'nanoid'
import './App.css'
import Quiz from './Quiz';

function App() {
  const [isQuizBtnClicked, setIsQuizBtnClicked] = useState(false)
  const [count, setCount] = useState(0)
  const [formData, setFormData] = useState({})
  const [correctOption, setCorrectOption] = useState([])
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [selectedOption, setSelectedOption] = useState([])
  const [quizzes, setQuizzes] = useState(
    [
      {
        id: '',
        question: '',
        c_answer: {
          correct_answer: '',
          isSelected: false
        },
        i_answers:
          [
            {
              incorrect_answer: '',
              isSelected: false
            }
          ],
        all_answer_choices: []
      }
    ]
  )



  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements at positions i and j
    }
    return array;
  }


  function handleChange(event, id) {
    const { name, value } = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  useEffect(() => {
    for (let key in formData) {
      setQuizzes(prevQuizzes => prevQuizzes.map(
        quiz => quiz.id === key ?
          {
            ...quiz,
            all_answer_choices: quiz.all_answer_choices.map(
              choice => choice.incorrect_answer === formData[key] ? { ...choice, isSelected: !choice.isSelected } : choice
            )
          } :
          quiz))
    }
  }, [isFormSubmitted])


  useEffect(() => {

    async function fetchData() {
      const response = await fetch('https://opentdb.com/api.php?amount=5')
      const data = await response.json()
      setQuizzes(data.results.map(result => {
        return {
          id: nanoid(),
          question: decode(result.question),
          c_answer: {
            correct_answer: decode(result.correct_answer),
            isSelected: false
          },
          i_answers: result.incorrect_answers.map(wrongAns => {
            return {
              incorrect_answer: decode(wrongAns),
              isSelected: false
            }
          }),
          all_answer_choices: shuffleArray([...(result.incorrect_answers.map(wrongAns => {
            return {
              incorrect_answer: decode(wrongAns),
              isSelected: false
            }
          })), {
            incorrect_answer: decode(result.correct_answer),
            isSelected: false
          }]) // end of  all_answer_choices
        }
      }))

    }
    fetchData()
  }, [])



  function handleClick() {
    setIsQuizBtnClicked(!isQuizBtnClicked)
  }

  function onFormSubmit(event) {

    event.preventDefault();
    let i = 0
    if (formData) {
      for (let key in formData) {
        quizzes.forEach(quiz => (quiz.id === key && quiz.c_answer.correct_answer === formData[key]) ? i++ : i)
      }
      setCount(i)
    }

    setIsFormSubmitted(true)
    quizzes.forEach((quiz) => {
      setCorrectOption([...correctOption, correctOption.push(quiz.correct_answer)])
    })
    for (let key in formData) {
      setSelectedOption([...selectedOption, selectedOption.push(formData[key])])
    }
  }

  function handlePlayAgain() {
    window.location.reload()
  }


  return (
    <>

      {(!isQuizBtnClicked) ? <div className="card">
        <h1>Quizzical</h1>
        <div className='icon'></div>
        <p className='quiz-tagline'>Let the QUIZ Begin!</p>

        <button onClick={handleClick}>
          Start quiz
        </button>
      </div>
        :
        <div className="card">
          <Quiz
            quizzes={quizzes}
            onFormSubmit={onFormSubmit}
            handleChange={handleChange}
            correctOption={correctOption}
            isFormSubmitted={isFormSubmitted}
            selectedOption={selectedOption}
            handlePlayAgain={handlePlayAgain}
            count={count}

          />
        </div>}
    </>
  )
}

export default App
