'use client'

import { useMachine } from '@xstate/react'
import synthMachine from './machine'
import { Button } from '@chakra-ui/react'

function Synth(): JSX.Element {
  const [state, send] = useMachine(synthMachine)

  return (
    <div>
      {state.matches('idle') && (
        <Button
          onClick={(e) => {
            e.preventDefault()
            send({
              type: 'start',
            })
          }}
        >
          power on
        </Button>
      )}

      {state.matches('running') && (
        <Button
          onMouseDown={(e) => {
            e.preventDefault()
            send({
              type: 'toggle',
              params: { on: true },
            })
          }}
          onMouseUp={(e) => {
            e.preventDefault()
            send({
              type: 'toggle',
              params: { on: false },
            })
          }}
        >
          play note
        </Button>
      )}
    </div>
  )
}

export default Synth
