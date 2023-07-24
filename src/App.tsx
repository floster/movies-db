import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(8)

  return (
    <div>
      React works {count}
    </div>
  )
}

export default App
