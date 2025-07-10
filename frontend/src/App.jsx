import { useState } from 'react'
import './App.css'
import Currency from './components/currency'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Currency/>
    </>
  )
}

export default App
