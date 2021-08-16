import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?type=multiple&encoding=legacy'

// const url = ''

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [quizUrl,setquizUrl] = useState({
    amount:'10',
    category:'21',
    difficulty:'easy'
  })
  const [showQuestions,setShowQuestions] = useState(false)
  const [quiz,setQuiz] = useState([])
  const [loading,setLoading] = useState(false)
   const [index,setIndex] = React.useState(0)
   const [modal,setModal] = React.useState(false)
   const [correct,setCorrect] = useState(0)
  const fetchData = async()=>{
    setLoading(true)
    let url
    url = `${API_ENDPOINT}&amount=${quizUrl.amount}&difficulty=${quizUrl.difficulty}&category=${quizUrl.category}`
    console.log(url)
    try{
      const res = await fetch(url)
      const quiz = await res.json()
      setQuiz(quiz.results)
      console.log(quiz.results)
    }
    catch(err){
      console.log(err)
      setLoading(true)
    }
    setLoading(false)
  }
  const handleStart =(e)=>{
    e.preventDefault()
    fetchData()
    setShowQuestions(true)
  }
  const handleChange= (e)=>{
    setquizUrl({...quizUrl,amount:e.target.value})
  }
  const handleCat = (e)=>{
    setquizUrl({...quizUrl,category:table[e.target.value]})
  }
   const handleDiff = (e)=>{
    setquizUrl({...quizUrl,difficulty:e.target.value})
  }
   const handleIndexPlus = (option)=>{
     if(option === quiz[index].correct_answer){
    console.log(quiz[index].correct_answer + ' correct ' +  option)
    setCorrect(correct + 1)
    }
    if(index >= quiz.length-1){
      setModal(true)
    }
    else{  
    setIndex(index+1)
    }
  }
  const PlayAgain = ()=>{
    setShowQuestions(false)
    setModal(false)
    window.location.reload()
  }
  const handleIndexNext = ()=>{
    if(index >= quiz.length-1){
      setModal(true)
    }
    else
    setIndex(index+1)
  }
  return <AppContext.Provider 
  value={{
    ...quizUrl,
    handleStart,
    handleChange,handleCat,handleDiff,
    showQuestions,quiz,loading,index,handleIndexPlus,modal,PlayAgain,handleIndexNext,correct
  }}
  >{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
