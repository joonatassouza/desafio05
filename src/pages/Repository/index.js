import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';
import PaginateIssues from '../../components/PaginateIssues';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, Filters, FilterState } from './styles';

export default class Repository extends Component {
  static propTypes = {
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
    issuesStates: ['all', 'open', 'closed'],
    selectedIssueState: 'open',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { selectedIssueState, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: selectedIssueState,
          per_page: 5,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleFilter = async selectedIssueState => {
    const {
      selectedIssueState: oldSelectedIssueState,
      repository,
      page,
    } = this.state;

    if (oldSelectedIssueState !== selectedIssueState) {
      this.setState({
        loading: true,
      });

      const issues = await api.get(`/repos/${repository.full_name}/issues`, {
        params: {
          state: selectedIssueState,
          per_page: 5,
          page,
        },
      });

      this.setState({
        issues: issues.data,
        loading: false,
        selectedIssueState,
      });
    }
  };

  handlePagination = async toPage => {
    const { selectedIssueState, repository } = this.state;

    this.setState({
      loading: true,
    });

    const issues = await api.get(`/repos/${repository.full_name}/issues`, {
      params: {
        state: selectedIssueState,
        per_page: 5,
        page: toPage,
      },
    });

    this.setState({
      issues: issues.data,
      loading: false,
      selectedIssueState,
      page: toPage,
    });
  };

  render() {
    const {
      repository,
      issues,
      issuesStates,
      page,
      selectedIssueState,
      loading,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Back to repositories</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Filters>
          {issuesStates.map(state => (
            <FilterState
              key={state}
              selected={state === selectedIssueState}
              loading={loading ? 1 : 0}
              onClick={() => this.handleFilter(state)}
            >
              {state}
            </FilterState>
          ))}
        </Filters>

        <PaginateIssues
          handlePagination={this.handlePagination}
          page={page}
          lastPage={issues.lenght === 0}
        />

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <PaginateIssues
          handlePagination={this.handlePagination}
          page={page}
          lastPage={issues.lenght === 0}
        />
      </Container>
    );
  }
}
