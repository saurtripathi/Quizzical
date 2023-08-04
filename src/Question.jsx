import React from 'react'
export default function Question(props) {
    console.log(props.all_answer_choices)

    const answerElementsArray = props.all_answer_choices.map(answer_choice => {
        <li>
            <input type="radio" id={answer_choice.id} name="amount" />
            <label htmlFor="1">Answer1</label>
        </li>
    })

    return (
        <div></div>
    )
}