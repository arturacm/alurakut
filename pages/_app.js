import { createGlobalStyle, ThemeProvider } from 'styled-components'
import {AlurakutStyles} from "../src/lib/AlurakutCommons"

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background-image: url("https://wallpaperaccess.com/full/2186569.png");
    background-size: cover;
    //background-color: #D9E6F6;
    font-family: sans-serif;
  }
  #__next{
    display: flex;
    min-height:100vh;
    flex-direction: column;
  }
  img{
    max-width:100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: 'red',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
