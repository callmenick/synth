import { Button } from '@chakra-ui/react'

function Key({ note, toggleOn, toggleOff }): JSX.Element {
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
