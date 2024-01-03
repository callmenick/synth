'use client'

import { useMachine } from '@xstate/react'
import { assertEvent, assign, setup } from 'xstate'

const synthMachine = setup({
  types: {} as {
    context: {
      actx: null | AudioContext
      gainNode: null | GainNode
      oscillatorNode: null | OscillatorNode
    }
    events: { type: 'start' } | { type: 'toggle'; params: { on: boolean } }
    actions: { type: 'start' } | { type: 'play' }
  },
  actions: {
    start: assign(({ context, event }) => {
      assertEvent(event, 'start')

      const actx = new AudioContext()
      const gainNode = actx.createGain()
      const oscillator = actx.createOscillator()

      gainNode.gain.setValueAtTime(0, actx.currentTime)
      oscillator.connect(gainNode).connect(actx.destination)
      oscillator.start()

      return {
        ...context,
        actx,
        gainNode,
        oscillator,
      }
    }),
    toggle: ({ context, event }) => {
      assertEvent(event, 'toggle')

      const { actx, gainNode } = context
      const on = event.params.on

      if (!actx || !gainNode) return

      on
        ? gainNode.gain.setValueAtTime(1, actx.currentTime)
        : gainNode.gain.setValueAtTime(0, actx.currentTime)
    },
  },
}).createMachine({
  id: 'synth',
  initial: 'idle',
  context: {
    actx: null,
    gainNode: null,
    oscillatorNode: null,
  },
  states: {
    idle: {
      on: {
        start: {
          target: 'running',
          actions: 'start',
        },
      },
    },
    running: {
      on: {
        toggle: {
          actions: 'toggle',
        },
      },
    },
  },
})

function Synth(): JSX.Element {
  const [state, send] = useMachine(synthMachine)

  return (
    <div>
      {state.matches('idle') && (
        <button
          onClick={(e) => {
            e.preventDefault()
            send({
              type: 'start',
            })
          }}
        >
          power on
        </button>
      )}

      {state.matches('running') && (
        <button
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
        </button>
      )}
    </div>
  )
}

export default Synth
