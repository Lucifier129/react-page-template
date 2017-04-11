import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

let __INITIAL_STATE__ = window.__INITIAL_STATE__

let state = {
  ...__INITIAL_STATE__
}

function render () {
  ReactDOM.render(<App {...state} />, document.getElementById('root'))
}

render()
