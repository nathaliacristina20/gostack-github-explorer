import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import intl from 'react-intl-universal';
import { RepositoryInfo, Issues } from './styles';

import Header from '../../components/Header';

import api from '../../services/api';

import { useIntlUniversal } from '../../hooks/IntlUniversalContext';

interface IRepositoryParams {
  repository: string;
}

interface IRepository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface IIssue {
  title: string;
  id: number;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<IRepository | null>(null);
  const [issues, setIssues] = useState<IIssue[]>([]);

  const { params } = useRouteMatch<IRepositoryParams>();

  useIntlUniversal();

  useEffect(() => {
    async function loadData(): Promise<void> {
      const [getRepository, getIssues] = await Promise.all([
        api.get(`repos/${params.repository}`),
        api.get(`repos/${params.repository}/issues`),
      ]);

      setRepository(getRepository.data);
      setIssues(getIssues.data);
    }

    loadData();
  }, [params.repository]);

  return (
    <>
      <Header>
        <Link to="/">
          <FiChevronLeft size={16} />
          {intl.get('buttons.back')}
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img src={repository.owner.avatar_url} alt="Github Explorer" />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>{intl.get('buttons.issues-open')}</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
