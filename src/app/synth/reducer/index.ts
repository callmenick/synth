import { start, toggleNote } from './actions'
import { ActionType, Snapshot } from './types'

export const initialSnapshot: Snapshot = {
  actx: null,
  gainNode: null,
  oscillatorNode: null,
  state: 'idle',
}

export function reducer(snapshot: Snapshot, action: ActionType): Snapshot {
  switch (action.type) {
    case 'START':
      return start(snapshot)
    case 'TOGGLE_NOTE':
      return toggleNote(snapshot, action.params)
    default:
      return snapshot
  }
}
