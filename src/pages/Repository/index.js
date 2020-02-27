import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Page navegation
import PropTypes from 'prop-types';
import api from '../../services/api'; // github API

import Container from '../../components/Container'; // Component
import { Loading, Owner, IssueList, IssueFilter, PageActions } from './styles';

export default class Repository extends Component {
  static propTypes = {
    // Shape == Object
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filterIndex: 0,
    page: 1,
  };

  // Encontra os repositorios via API
  async componentDidMount() {
    // Nome do repositorio no github
    const { match } = this.props;
    const { filters } = this.state;
    const repoName = decodeURIComponent(match.params.repository);

    // Executa a pesquisa das 2 requisições ao mesmo tempo
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
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
    // Constantes com variaveis
    const { repository, loading, issues } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
      </Container>
    );
  }
}
