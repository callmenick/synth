import { Fragment } from 'react'
import Synth from './synth/index'
import { Container, Heading } from '@chakra-ui/react'

function Home(): JSX.Element {
  return (
    <Fragment>
      <header>
        <Container>
          <Heading>Synth</Heading>
        </Container>
      </header>
      <main>
        <Container>
          <Synth />
        </Container>
      </main>
    </Fragment>
  )
}

export default Home
