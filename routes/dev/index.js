import { Router } from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../../src/dev/App'
import serverConfig from '../../server.config'

const router = Router()

export default function (app) {
  app.use('/dev', router)
}

router.get('/', (req, res) => {
  let stats = req.stats
  let state = {
    a: 1,
    b: 2,
    c: 3
  }
  let content = ReactDOMServer.renderToString(<App {...state} />)
  res.render('dev/view', {
    ...serverConfig,
    stats: stats,
    title: 'dev_server',
    description: 'dev simple server side rendering',
    keywords: 'dev server render',
    content: content,
    initialState: state
  })
})
