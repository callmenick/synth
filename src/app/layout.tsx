import { Providers } from './providers'

export const metadata = {
  title: 'Synth',
  description: 'A web synth',
}

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
