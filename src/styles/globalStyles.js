import 'react-toastify/dist/ReactToastify.css'
// para Pop-ups em toda aplicação
import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
        outline: none;
    }

    body, html {
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        background: #fff;
        font-family: 'Inter', sans-serif;
    }

    // Definindo classes utilitárias para diferentes pesos da fonte
    .inter-light {
        font-family: 'Inter', sans-serif;
        font-weight: 300;
    }

    .inter-regular {
        font-family: 'Inter', sans-serif;
        font-weight: 400;
    }

    .inter-medium {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
    }

    .inter-semibold {
        font-family: 'Inter', sans-serif;
        font-weight: 600;
    }

    .inter-bold {
        font-family: 'Inter', sans-serif;
        font-weight: 700;
    }
`