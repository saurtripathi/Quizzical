import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {decode} from 'html-entities';
import { nanoid } from 'nanoid'
import './App.css'
import Quiz from './Quiz';

function App() {
  const [isQuizBtnClicked, setIsQuizBtnClicked] = useState(false)
  const [isPlayAgainClicked,setIsPlayAgainClicked] = useState(false)
  const [count,setCount] = useState(0)

  const [quizzes, setQuizzes] = useState(
    [
      {
        id                :         '',
        question          :         '',
        c_answer    :   {
                                    correct_answer:'',
                                    isSelected:false
                              },
        i_answers :
                            [
                              {
                                    incorrect_answer:'',
                                    isSelected:false
                              }
                          ],
      all_answer_choices  :[]
      }
    ]
    )
  const [answered, setAnswered] = useState(false)
  const [formData, setFormData] = useState({})
  const [correctOption, setCorrectOption] = useState([])
  const [isFormSubmitted,setIsFormSubmitted] = useState(false)
  const [selectedOption,setSelectedOption] = useState([])
  

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements at positions i and j
    }
    return array;
  }
  

function handleChange(event,id) {
  // console.log(`in handleChange,${id}`)
    const {name, value} = event.target
    // console.log(`${name} :  ${value}`)
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: value
        }
    })
}
useEffect(()=>{
          for (let key in formData) {
            // console.log(`${key} ${formData[key]}`)
            setQuizzes(prevQuizzes => prevQuizzes.map(     
              quiz => quiz.id===key ?
              {
                ...quiz,
                all_answer_choices:quiz.all_answer_choices.map(
                  choice => choice.incorrect_answer=== formData[key] ? {...choice,isSelected:!choice.isSelected} : choice
                  )
              } : 
              quiz)) 
          }
},[isFormSubmitted])  


  useEffect(() => {

    async function fetchData() {
      const response = await fetch('https://opentdb.com/api.php?amount=5')
      const data = await response.json()
      setQuizzes(data.results.map(result => {
        return {
          id:nanoid(),
          question : decode(result.question),
          c_answer:{
            correct_answer:decode(result.correct_answer),
            isSelected:false
          },
          i_answers : result.incorrect_answers.map(wrongAns => {
            return {
              incorrect_answer:decode(wrongAns),
              isSelected:false
            }
          }),
          all_answer_choices : shuffleArray([...(result.incorrect_answers.map(wrongAns => {
            return {
              incorrect_answer:decode(wrongAns),
              isSelected:false
            }
          })),{
            incorrect_answer:decode(result.correct_answer),
            isSelected:false
          }]) // end of  all_answer_choices
        } 
      }))

    }
    fetchData()
  }, [])


  // console.log(`isQuizBtnClicked : ${isQuizBtnClicked}`)
  // console.log(`isPlayAgainClicked : ${isPlayAgainClicked}`)
  function handleClick() {
    setIsQuizBtnClicked(!isQuizBtnClicked)
    // console.log(quizzes)
  }




  function onFormSubmit(event) {
    // Carcassonne,Boston Red Sox,$4750,SPARTAN-II,Egoist
    event.preventDefault();
    // console.log(formData)
    const dataArray = Object.keys(formData).map(function(k){return formData[k]})
    const [s1,s2,s3,s4,s5] = dataArray
    // console.log(`s1,s2,s3,s4,s5 : ${s1} ${s2} ${s3} ${s4} ${s5}`)
    const correctAnswers = quizzes.map(quiz => quiz.c_answer.correct_answer)  
    const [c1,c2,c3,c4,c5] = correctAnswers
    
    // const sum = (p1,p2) => (p1===p2) ? setCount(count => count + 1) : ''

    // sum(c1,s1)
    // sum(c2,s2)
    // sum(c3,s3)
    // sum(c4,s4)
    // sum(c5,s5)
   
      if(c1 === s1)
      setCount(count => count +1)
    if(c2 === s2)
    setCount(count => count +1)
    if(c3 === s3)
    setCount(count => count +1)
    if(c4 === s4)
    setCount(count => count +1)
    if(c5 === s5)
    setCount(count => count +1)
  
  
    let i = 0
     

    // console.log(`c1,c2,c3,c4,c5 : ${c1} ${c2} ${c3} ${c4} ${c5}`)
    // console.log(`correctAnswers : ${correctAnswers}`)
    // console.log(`s1,s2,s3,s4,s5 : ${dataArray}`)
    setIsFormSubmitted(true)
  quizzes.forEach((quiz) => {
    setCorrectOption([...correctOption,correctOption.push(quiz.correct_answer)])
  })
  for (let key in formData) {
    // console.log(`selected option : ${formData[key]}`)
    
       setSelectedOption([...selectedOption,selectedOption.push(formData[key])])

}
  




  }
  // console.log(`count : ${count}`)
function handlePlayAgain(){
  window.location.reload()
}


  return (
    <>

    { (!isQuizBtnClicked) ?  <div className="card">
     <h1>Quizzical</h1>
     <p>Some description if needed</p>
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
      </div> }
   
   
         
      
    </>
  )
}

export default App
