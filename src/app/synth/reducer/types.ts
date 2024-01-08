export type Snapshot = {
  actx: null | AudioContext
  gainNode: null | GainNode
  oscillatorNode: null | OscillatorNode
  state: 'idle' | 'running'
}

export type ActionType =
  | {
      type: 'START'
    }
  | {
      type: 'TOGGLE_NOTE'
      params: {
        on: boolean
        frequency?: number
      }
    }
