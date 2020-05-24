import React, { useState, useEffect, FormEvent } from 'react';

import intl from 'react-intl-universal';

import { Link } from 'react-router-dom';

import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import { useIntlUniversal } from '../../hooks/IntlUniversalContext';
import Header from '../../components/Header';

import { Title, Form, Repositories, Error } from './styles';

interface IRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');

  useIntlUniversal();

  const [repositories, setRepositories] = useState<IRepository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError(intl.get('errors.empty-search'));
      return;
    }

    try {
      const response = await api.get<IRepository>(`repos/${newRepo}`);
      const repository = response.data;
      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError(
        intl.getHTML('errors.repository-not-found', { repository: newRepo }),
      );
    }
  }
  return (
    <>
      <Header />
      <Title>{intl.get('home.title')}</Title>
      {/* ou !!inputError */}

      <Form hasError={Boolean(inputError)} onSubmit={handleAddRepository}>
        <input
          type="text"
          placeholder={intl.get('home.search.placeholder')}
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit">{intl.get('home.search.button')}</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />

            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
