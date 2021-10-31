import React from "react";
import classes from './AnswersItem.module.css'
import { ClickedContext } from "../../../../containers/quiz/Quiz.js";
const AnswerItem = props => {
  return (
    <ClickedContext.Consumer>
      {(context)=> {
        return (
          <li 
            className={classes.AnswerItem}
            onClick={context}
            data-id={props.id}
          >
            {props.answer.text}
          </li>
        )
      }}
    </ClickedContext.Consumer>

  )
}
export default AnswerItem

// eslint-disable-next-line import/no-anonymous-default-export
// export default props => {
//   return (
//     <div>
//       <h3>Counter 2</h3>
//       <ClickedContext.Consumer>
//         {(clicked) => clicked ? <p>Clicked</p>: null}
//       </ClickedContext.Consumer>
//     </div>
//   )
// }
//  <ClickedContext.Consumer>
// <li 
//   className={classes.AnswerItem}
//   onClick={props.onAnswerClick}
//   data-id={props.id}
// >
//   {props.answer.text}
// </li>
// </ClickedContext.Consumer>