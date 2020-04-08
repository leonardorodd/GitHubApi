import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container/index';
import { Loading, Owner, IssueList } from './styles';

class Repository extends Component {
    // chamadas a APIS externas usar async/await
    // eslint-disable-next-line react/state-in-constructor
    state = {
        repository: {},
        issues: [],
        loading: true,
    };

    // eslint-disable-next-line react/static-property-placement
    static propTypes = {
        // validação de objeto - shape
        // isrequired é aplicado a todo o objeto (propriedades)
        match: PropTypes.shape({
            params: PropTypes.shape({
                repositoryname: PropTypes.string,
            }),
        }).isRequired,
    };

    // prop-types é necessário para validar as propriedades criadas pelo react router
    async componentDidMount() {
        const { match } = this.props;
        const name = decodeURIComponent(match.params.repositoryname);

        /* Ambas chamadas serão executadas ao mesmo tempo e o fluxo de execução da função só continuará após a execução
        das duas chamadas

        O resultado de cada promisse é retomado em forma de array
        */
        // repository = [0], issues = [1]
        const [repository, issues] = await Promise.all([
            api.get(`/repos/${name}`),
            api.get(`/repos/${name}/issues`, {
                auth: {
                    username: 'leonardorodd',
                    password: 'tecnoa180leo',
                },
                // query params repos/facebook/react/issues?state=open&per_page=5
                params: {
                    state: 'open',
                    per_page: 30,
                },
            }),
        ]);

        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading: false,
        });
    }

    render() {
        const { repository, issues, loading } = this.state;

        /* Apenas um return é executado. Quando o componente é renderizado pela primeira vez, o
        propriedade loading será verdadeira e o primeiro return será executado e o segundo ignorado. Pois
        tudo abaixo do return é ignorado */

        if (loading) {
            return (
                <Loading loading={loading}>
                    <h5>Carregando</h5>
                    <FaSpinner color="#FFF" size={20} />
                </Loading>
            );
        }

        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar aos repositórios</Link>
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}/</p>
                </Owner>
                <IssueList>
                    {issues.length > 0 && <h5>Issues List</h5>}
                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img
                                src={issue.user.avatar_url}
                                alt={issue.user.login}
                            />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>
                                            {label.name}
                                        </span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssueList>
            </Container>
        );
    }
}

export default Repository;
