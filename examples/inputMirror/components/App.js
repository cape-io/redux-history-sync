import React from 'react'
import Hello from './Hello'
import Input from './Input'

function App({ value, onChange }) {
  return (
    <div>
      <Hello url={value} />
      <Input value={value} onChange={onChange} />
    </div>
  )
}

export default App
