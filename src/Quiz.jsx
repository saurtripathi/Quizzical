import React,{useEffect,useState} from 'react'
import ReactDOM from 'react-dom/client';
import AnswerChoices from './AnswerChoices'
import Question from './Question'

export default function Quiz(props){
  
            console.log(props.quizzes)
           
        
            const questionAndAnswerElements = props.quizzes.map(function(quiz){
            const question = quiz.question
            const [answer_ch1,answer_ch2,answer_ch3,answer_ch4] = quiz.all_answer_choices

            const a = answer_ch1 ? answer_ch1.incorrect_answer : ''
            const b = answer_ch2 ? answer_ch2.incorrect_answer : ''
            const c = answer_ch3 ? answer_ch3.incorrect_answer : ''
            const d = answer_ch4 ? answer_ch4.incorrect_answer :''

            const isSelected_a = answer_ch1 ? answer_ch1.isSelected : ''
            const isSelected_b = answer_ch2 ? answer_ch2.isSelected : ''
            const isSelected_c = answer_ch3 ? answer_ch3.isSelected : ''
            const isSelected_d = answer_ch4 ? answer_ch4.isSelected :''

            const questionId  = quiz.id
            const {correct_answer,isSelected} = quiz.c_answer

          
         const style1 ={
            backgroundColor: (isSelected_a && correct_answer === a) ? 
            '#94D7A2'  : (isSelected_a && correct_answer !== a) ? '#F8BCBC' : (!isSelected_a && correct_answer == a)?'#94D7A2' : '#FFFFFF'
         } 
         const style2 ={
            backgroundColor: (isSelected_b && correct_answer === b) ? 
            '#94D7A2'  : (isSelected_b && correct_answer !== b) ? '#F8BCBC' : (!isSelected_b && correct_answer == b)?'#94D7A2' : '#FFFFFF'
         }
         const style3 ={
            backgroundColor: (isSelected_c && correct_answer === c) ? 
            '#94D7A2'  : (isSelected_c && correct_answer !== c) ? '#F8BCBC' : (!isSelected_c && correct_answer == c)?'#94D7A2' : '#FFFFFF'
         } 
         const style4 ={
            backgroundColor: (isSelected_d && correct_answer === d) ? 
            '#94D7A2'  : (isSelected_d && correct_answer !== d) ? '#F8BCBC' : (!isSelected_d && correct_answer == d)?'#94D7A2' : '#FFFFFF'
         }

            return          <div key={questionId} className='quiz--item'>
                            <p className='question--text'> {question}</p>
                            <ul className="answer--list">
            {
                a && <li>
                        <input 
                            required
                            type="radio" 
                            id={questionId} 
                            name={questionId} 
                            value={a}
                            onChange={(event)=>props.handleChange(event,questionId)}
                        />
                        {
                            props.isFormSubmitted ? 
                            <label htmlFor={a} style={style1}>{a}</label> :
                            <label htmlFor={a} >{a}</label>
                        }
                    </li>
            }
            {
                b &&<li>
                        <input 
                            type="radio" 
                            id={questionId} 
                            name={questionId} 
                            value={b}
                            onChange={(event)=>props.handleChange(event,questionId)}
                        />
                        {
                            props.isFormSubmitted ? 
                            <label htmlFor={b} style={style2}>{b}</label> :
                            <label htmlFor={b} >{b}</label>
                        }
                        
                    </li>
            }
            {
                c &&<li>
                    <input 
                        type="radio" 
                        id={questionId} 
                        name={questionId} 
                        value={c}
                        onChange={(event)=>props.handleChange(event,questionId)}
                    />
                        {
                            props.isFormSubmitted ? 
                            <label htmlFor={c} style={style3}>{c}</label> :
                            <label htmlFor={c} >{c}</label>
                        }
                    
                </li>
            }
            {
                d &&<li>
                    <input  
                        type="radio" 
                        id={questionId} 
                        name={questionId} 
                        value={d}
                        onChange={(event)=>props.handleChange(event,questionId)}
                    />
                        {
                            props.isFormSubmitted ? 
                            <label htmlFor={d} style={style4}>{d}</label> :
                            <label htmlFor={d} >{d}</label>
                        }
                   
                </li>
            }
        
            
            </ul>
            </div>
            


    })
    


    return( 
        
            <form onSubmit={props.onFormSubmit}>
            {questionAndAnswerElements}
            {!props.isFormSubmitted ?
            <button className='btn-check-answers' type='submit' >Check answers</button>:
            <div className='result--div'>
                <p className='result--p'>
                    You scored {props.count}/5 correct answers
                </p>
                <button className='btn-check-answers' onClick={props.handlePlayAgain} >Play again</button>
            </div>
        } 
            </form>
        
    )
}




