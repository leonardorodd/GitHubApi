import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

export const Loading = styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center; /**Alinha horizontalmente no centro*/
    align-items: center;
    height: 100vh;

    svg {
        margin-left: 10px;
    }

    ${props =>
        props.loading &&
        css`
            svg {
                animation: ${rotate} 1.5s linear infinite;
            }
        `}
`;

export const Owner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        color: #7159c1;
        font-size: 16px;
        text-decoration: none;
    }

    img {
        margin-top: 20px;
        width: 120px;
        border-radius: 50%; /**borda arredondada */
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }
`;

export const IssueList = styled.ul`
    margin-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        flex-direction: row;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;

        & + li {
            margin-top: 10px;
        }

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #eee;
        }

        div {
            flex: 1; /**ocupa todo espaço disponível e impede que o conteúdo ultrapassa o tamanho
            da div */
            margin-left: 15px;
            strong {
                font-size: 16px;

                a {
                    text-decoration: none;
                    color: #333;

                    &:hover {
                        color: #7159c1;
                    }
                }

                span {
                    background: #eee;
                    color: #333;
                    border-radius: 2px;
                    font-size: 12px;
                    font-weight: 600;
                    height: 20px;
                    padding: 3px 4px;
                    margin-left: 5px;
                }
            }

            p {
                margin-top: 5px;
                font-size: 12px;
                color: #999;
            }
        }
    }

    h5 {
        display: flex;
        justify-content: center;
        color: #7159c1;
        margin: 15px 15px;
        font-size: 15px;
    }
`;
