import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Form, SubmitButton, List } from './styles';
import Container from '../../components/Container/index';
import api from '../../services/api';

class Main extends Component {
    // eslint-disable-next-line react/state-in-constructor
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
        error: false,
    };

    // Chamado quando o componente é construído
    componentDidMount() {
        const repositories = localStorage.getItem('repositories');

        if (repositories) {
            this.setState({ repositories: JSON.parse(repositories) });
        } else {
            const repo = [
                { name: 'facebook/react' },
                { name: 'rocketseat/unform' },
                { name: 'facebook/graphql' },
            ];

            this.setState({ repositories: repo });
        }
    }

    componentDidUpdate(_, prevState) {
        const { repositories } = this.state;

        if (prevState.repositories !== repositories) {
            // localStorage não suporta arrays
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value });
    };

    handleSubmit = async e => {
        // Evita o resfresh da pagina default do submit
        e.preventDefault();

        this.setState({ loading: true });
        // chamada assyncrona, pois pode demorar.
        const { newRepo, repositories } = this.state;
        const response = await api
            .get(`/repos/${newRepo}`)
            .catch(error => error.response);

        if (response === undefined || response.status === 404) {
            this.setState({ error: true, loading: false, newRepo: '' });
        } else {
            const data = {
                name: response.data.full_name,
            };

            this.setState({
                repositories: [...repositories, data],
                newRepo: '',
                loading: false,
                error: false,
            });
        }
    };

    render() {
        const { newRepo, loading, repositories, error } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt id="git" />
                    Repositórios
                </h1>
                <Form onSubmit={this.handleSubmit} error={error}>
                    <input
                        type="text"
                        placeholder="Adicionar Repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />
                    <SubmitButton loading={loading}>
                        {/* Conditional Rendering */}
                        {loading ? (
                            <FaSpinner color="#FFF" size={14} />
                        ) : (
                            <FaPlus color="#FFF" size={14} />
                        )}
                    </SubmitButton>
                </Form>
                {error && (
                    <div id="errormesage">
                        <h5>Repository not found</h5>
                    </div>
                )}
                <List>
                    {repositories.length > 0 && <h1>Repositories List</h1>}
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link
                                to={`/repository/${encodeURIComponent(
                                    repository.name
                                )}`}
                            >
                                Detalhes
                            </Link>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}

export default Main;
