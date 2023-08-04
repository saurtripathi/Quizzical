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
                    {/* <li>
                        <input type="radio" id="1" name="amount" />
                        <label htmlFor="1">Answer1</label>
                    </li>
                    <li>
                        <input type="radio" id="2" name="amount" />
                        <label htmlFor="2">Answer2</label>
                    </li>
                    <li>
                        <input type="radio" id="3" name="amount" checked="checked" />
                        <label htmlFor="3">Answer3</label>
                    </li>
                    <li>
                        <input type="radio" id="4" name="amount" />
                        <label htmlFor="4">Answer4</label>
                    </li> */}
                    {answerElementsArray}
                </ul>
        </div>
    )
}