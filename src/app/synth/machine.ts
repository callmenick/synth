import { assertEvent, assign, setup } from 'xstate'

const synthMachine = setup({
  types: {} as {
    context: {
      actx: null | AudioContext
      gainNode: null | GainNode
      oscillatorNode: null | OscillatorNode
    }
    events:
      | {
          type: 'start'
        }
      | {
          type: 'toggleOn'
          params: {
            frequency: number
          }
        }
      | {
          type: 'toggleOff'
          params: {}
        }
    actions: { type: 'start' }
  },
  actions: {
    start: assign(({ context, event }) => {
      assertEvent(event, 'start')

      const actx = new AudioContext()
      const gainNode = actx.createGain()
      const oscillatorNode = actx.createOscillator()

      gainNode.gain.setValueAtTime(0, actx.currentTime)
      oscillatorNode.connect(gainNode).connect(actx.destination)
      oscillatorNode.start()

      return {
        ...context,
        actx,
        gainNode,
        oscillatorNode,
      }
    }),
    toggleOn: ({ context, event }) => {
      assertEvent(event, 'toggleOn')

      const { actx, gainNode, oscillatorNode } = context
      const { frequency } = event.params

      if (!actx || !gainNode || !oscillatorNode) return

      oscillatorNode.frequency.setValueAtTime(frequency, actx.currentTime)
      gainNode.gain.setValueAtTime(1, actx.currentTime)
    },
    toggleOff: ({ context, event }) => {
      assertEvent(event, 'toggleOff')

      const { actx, gainNode, oscillatorNode } = context

      if (!actx || !gainNode || !oscillatorNode) return

      gainNode.gain.setValueAtTime(0, actx.currentTime)
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
        toggleOn: {
          actions: 'toggleOn',
        },
        toggleOff: {
          actions: 'toggleOff',
        },
      },
    },
  },
})

export default synthMachine
