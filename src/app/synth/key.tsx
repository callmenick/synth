import { Button } from '@chakra-ui/react'
import { Note } from './constants'

function Key({
  note,
  toggleOn,
  toggleOff,
}: {
  note: Note
  toggleOn: (frequency: number) => void
  toggleOff: () => void
}) {
  return (
    <Button
      onPointerDown={(e) => {
        e.preventDefault()

        toggleOn(note.frequency)

        document.addEventListener(
          'pointerup',
          () => {
            toggleOff()
          },
          { once: true }
        )
      }}
    >
      {note.key}
    </Button>
  )
}

export default Key
