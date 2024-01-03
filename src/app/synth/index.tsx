'use client'

import { useMachine } from '@xstate/react'
import synthMachine from './machine'
import { Button } from '@chakra-ui/react'
import { notes } from './constants'
import Key from './key'
import { useCallback, useEffect } from 'react'

function Synth(): JSX.Element {
  const [state, send] = useMachine(synthMachine)

  const toggleOn = useCallback(
    (frequency: number) => {
      send({
        type: 'toggleOn',
        params: { frequency },
      })
    },
    [send]
  )

  const toggleOff = useCallback(() => {
    send({
      type: 'toggleOff',
      params: {},
    })
  }, [send])

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
        <div>
          {notes.map((note) => (
            <Key
              key={note.key}
              note={note}
              toggleOn={toggleOn}
              toggleOff={toggleOff}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Synth
