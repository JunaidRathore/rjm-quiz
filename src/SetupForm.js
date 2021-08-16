import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  
  
  const {amount,handleStart,handleChange,handleCat,handleDiff,showQuestions,quiz,index,handleIndexPlus,handleIndexNext
    ,correct} = useGlobalContext()
  
  if(!showQuestions){
    return <section className="quiz quiz-small">
      <form className="setup-form">
        <h2>setup quiz</h2>
        <div className="form-control">
          <label htmlFor="amount">number of questions</label>
          <input className="form-input" type="number" value={amount}  onChange={handleChange} name="amount" id="amount" />
        </div>
        <div className="form-control">
          <label htmlFor="category">category</label>
          <select name="category" id="category" className="form-input" onClick={handleCat}>
            <option value="sports">sports</option>
            <option value="history">history</option>
            <option value="politics">politics</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="difficulty">select difficulty</label>
          <select name="difficulty" id="difficulty" className="form-input" onClick={handleDiff}>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>
        <button className="submit-btn" type="submit"  onClick={handleStart}>start</button>
      </form>
    </section>
  }  
  if(showQuestions){
    const random = Math.floor(Math.random()*4)
    quiz[index].incorrect_answers.splice(random,0,quiz[index].correct_answer)
     const {question} = quiz[index]
    return <section className="quiz">
      <p className="correct-answers">
        correct answers : {correct} / {quiz.length}
      </p>
      <article className="container">
        <h2 dangerouslySetInnerHTML = {{__html : question}}/>
        <div className="btn-container">
          {
            quiz[index].incorrect_answers.map((option,i)=>{
              return <button className="answer-btn" key={i} onClick={()=>handleIndexPlus(option)}>{option}</button>
            })
          }
        </div>
      </article>
      <button className="next-question" onClick={handleIndexNext}>next question</button>
    </section>
  }
}

export default SetupForm
