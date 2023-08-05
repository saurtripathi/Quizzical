import React from 'react'
export default function AnswerChoices(props) {
    console.log(props.all_ans)

    const answerElementsArray = props.all_ans.map(answer_choice => {
        <li>
            <input type="radio" id={answer_choice} name="answer" />
            <label htmlFor={answer_choice}>answer_choice</label>
        </li>
    })

    return (
        <div>
                <ul class="answer--list">
                    {answerElementsArray}
                </ul>
        </div>
    )
}