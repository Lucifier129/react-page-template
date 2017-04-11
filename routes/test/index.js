import { Router } from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../../src/test/App'
import serverConfig from '../../server.config'

const router = Router()

export default function (app) {
  app.use('/test', router)
}

router.get('/', (req, res) => {
  let stats = req.stats
  let state = {
    a: 1,
    b: 2,
    c: 3
  }
  let content = ReactDOMServer.renderToString(<App {...state} />)
  res.render('test/view', {
    ...serverConfig,
    stats: stats,
    title: 'test_server',
    description: 'test simple server side rendering',
    keywords: 'test server render',
    content: content,
    initialState: state
  })
})
