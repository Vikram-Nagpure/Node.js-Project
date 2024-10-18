import { useState } from 'react'
import './App.css'
import CrudApp from './CrudApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <CrudApp />
    </>
  )
}

export default App
