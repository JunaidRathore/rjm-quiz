import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const {modal,PlayAgain,quiz,correct} = useGlobalContext()
  const percent = (correct * 100) / quiz.length
  return <div className={`modal-container ${modal ? 'isOpen' : ''}`}>
    <div className="modal-content">
      <h2>congrats!</h2>
      <p>You anserwed {Math.floor(percent)}% of questions correctly!</p>
      <button className="close-btn" onClick={PlayAgain}>play again</button>
    </div>
  </div>
}

export default Modal
