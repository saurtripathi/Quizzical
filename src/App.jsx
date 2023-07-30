import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
        Start quiz
        </button>
      </div>
    </>
  )
}

export default App
