import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const {loading,showQuestions} = useGlobalContext()
  if(loading){
    return <Loading />
  }
  return <main>
    {showQuestions && <Modal />}
    <SetupForm />
  </main>
}

export default App
