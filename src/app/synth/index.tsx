'use client'

import { Button } from '@chakra-ui/react'
import { notes } from './constants'
import Key from './key'
import { useReducer } from 'react'
import { initialSnapshot, reducer } from './reducer'

function Synth() {
  const [snapshot, dispatch] = useReducer(reducer, initialSnapshot)

  return (
    <div>
      {snapshot.state === 'idle' && (
        <div>
          <Button
            onClick={(e) => {
              dispatch({
                type: 'START',
              })
            }}
          >
            power on
          </Button>
        </div>
      )}

      {snapshot.state === 'running' && (
        <div>
          {notes.map((note) => (
            <Key
              key={note.key}
              note={note}
              toggleOn={(frequency) => {
                dispatch({
                  type: 'TOGGLE_NOTE',
                  params: {
                    on: true,
                    frequency,
                  },
                })
              }}
              toggleOff={() => {
                dispatch({
                  type: 'TOGGLE_NOTE',
                  params: {
                    on: false,
                  },
                })
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Synth
