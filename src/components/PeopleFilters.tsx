import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  setHasPeopleFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PeopleFilters: React.FC<Props> = ({ setHasPeopleFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuryFilter = searchParams.getAll('centuryFilter') || ['all'];
  const genderFilter = searchParams.get('genderFilter') || 'all';

  if (centuryFilter.length === 0) {
    searchParams.append('centuryFilter', 'all');
  }

  function setGenderFilter(filterElement: string) {
    searchParams.set('genderFilter', filterElement);

    if (filterElement !== 'all') {
      setHasPeopleFilter(true);
    } else {
      setHasPeopleFilter(false);
    }
  }

  function setQuery(event: React.ChangeEvent<HTMLInputElement>) {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('query', event.target.value);

    setSearchParams(newSearchParams);
  }

  function setCenturyFilter(century: string) {
    let updated = [...centuryFilter];

    if (centuryFilter.includes('all')) {
      updated = [century];
    } else {
      if (!centuryFilter.includes(century)) {
        updated = [...centuryFilter, century];
      } else {
        updated = [...centuryFilter.filter(e => e !== century)];
      }
    }

    if (updated.length === 0) {
      updated = ['all'];
    }

    searchParams.delete('centuryFilter');
    updated.forEach(e => searchParams.append('centuryFilter', e));
  }

  function reset() {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('query', '');
    setSearchParams(newSearchParams);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          onClick={() => setGenderFilter('all')}
          className={genderFilter === 'all' ? 'is-active' : ''}
          to="#/people"
        >
          All
        </Link>
        <Link
          onClick={() => setGenderFilter('male')}
          className={genderFilter === 'male' ? 'is-active' : ''}
          to="#/people?sex=m"
        >
          Male
        </Link>
        <Link
          onClick={() => setGenderFilter('female')}
          className={genderFilter === 'female' ? 'is-active' : ''}
          to="#/people?sex=f"
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={setQuery}
          />

          <span className="icon is-left" onClick={reset}>
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuryFilter.includes('16'),
              })}
              onClick={() => setCenturyFilter('16')}
              to="#/people?centuries=16"
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuryFilter.includes('17'),
              })}
              onClick={() => setCenturyFilter('17')}
              to="#/people?centuries=17"
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuryFilter.includes('18'),
              })}
              onClick={() => setCenturyFilter('18')}
              to="#/people?centuries=18"
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuryFilter.includes('19'),
              })}
              onClick={() => setCenturyFilter('19')}
              to="#/people?centuries=19"
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuryFilter.includes('20'),
              })}
              onClick={() => setCenturyFilter('20')}
              to="#/people?centuries=20"
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              // className="button is-success is-outlined"
              className={classNames('button is-success', {
                'is-outlined': !centuryFilter.includes('all'),
              })}
              onClick={() => {
                searchParams.delete('centuryFilter');
                searchParams.set('centuryFilter', 'all');
              }}
              to="#/people"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          onClick={() => {
            searchParams.set('genderFilter', 'all');
            searchParams.set('centuryFilter', 'all');
            searchParams.delete('query');
          }}
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
