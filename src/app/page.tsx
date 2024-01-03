import { Fragment } from 'react'
import Synth from './synth'

function Home(): JSX.Element {
  return (
    <Fragment>
      <header>
        <h1>Web Synth</h1>
      </header>
      <main>
        <Synth />
      </main>
    </Fragment>
  )
}

export default Home
