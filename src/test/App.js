import React from 'react'
import Layout from './component/Layout'

export default function App (props) {
  return (
    <Layout>
      <ul>
        <li><a href={`/test/test`}>test</a></li>
        <li><a href={`/test/dev`}>dev</a></li>
      </ul>
      <div>{JSON.stringify(props, null, 2)}</div>
    </Layout>
  )
}
