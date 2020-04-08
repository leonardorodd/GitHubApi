import { createGlobalStyle } from 'styled-components';
// estilização global (compartilhado por toda a aplicação)
// remove algumas propriedades que vem por padrão dos elementos html
export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        min-height: 100%;
    }

    body {
        background: #7159c1;
        -webkit-font-smothing: antialiased !important;
    }

    body, input, button {
        color: #222;
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif
    }

    button {
        cursor: pointer;
    }
`;

// border-box faz com que os espaçamentos sejam sempre adaptados a largura do elemento,
