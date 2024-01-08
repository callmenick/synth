import { Snapshot } from './types'

export function start(snapshot: Snapshot): Snapshot {
  const actx = new AudioContext()
  const gainNode = actx.createGain()
  const oscillatorNode = actx.createOscillator()

  gainNode.gain.setValueAtTime(0, actx.currentTime)
  oscillatorNode.connect(gainNode).connect(actx.destination)
  oscillatorNode.start()

  return {
    ...snapshot,
    state: 'running',
    actx,
    gainNode,
    oscillatorNode,
  }
}

export function toggleNote(snapshot: Snapshot, params): Snapshot {
  const { actx, gainNode, oscillatorNode } = snapshot
  const { on, frequency } = params

  if (on) {
    oscillatorNode.frequency.setValueAtTime(frequency, actx.currentTime)
    gainNode.gain.setValueAtTime(1, actx.currentTime)
  } else {
    gainNode.gain.setValueAtTime(0, actx.currentTime)
  }

  return snapshot
}
