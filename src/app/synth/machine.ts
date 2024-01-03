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

export default synthMachine
