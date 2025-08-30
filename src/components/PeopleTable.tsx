import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  updatedList: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people, updatedList }) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';

  function getSortParams(sortField: string) {
    const newSearchParams = new URLSearchParams(searchParams);

    if (currentSort === sortField) {
      if (currentOrder === 'asc') {
        newSearchParams.set('order', 'desc');
      } else if (currentOrder === 'desc') {
        newSearchParams.delete('sort');
        newSearchParams.delete('order');
      }
    } else {
      newSearchParams.set('sort', sortField);
      newSearchParams.set('order', 'asc');
    }

    return `?${newSearchParams.toString()}`;
  }

  function findMotherInPeople(person: Person) {
    const mother = people.find(p => p.name === person.motherName);

    if (mother) {
      return <PersonLink person={mother} />;
    }

    return person.motherName ? person.motherName : '-';
  }

  function findFatherInPeople(person: Person) {
    const father = people.find(p => p.name === person.fatherName);

    if (father) {
      return <PersonLink person={father} />;
    }

    return person.fatherName ? person.fatherName : '-';
  }

  const peopleSort = (p1: Person, p2: Person) => {
    if (currentSort === 'name' || currentSort === 'sex') {
      return currentOrder === 'asc'
        ? p1[currentSort].localeCompare(p2[currentSort])
        : p2[currentSort].localeCompare(p1[currentSort]);
    }

    if (currentSort === 'born' || currentSort === 'died') {
      return currentOrder === 'asc'
        ? p1[currentSort] - p2[currentSort]
        : p2[currentSort] - p1[currentSort];
    }

    return 0;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <Link to={getSortParams('name')}>
                <span className="icon">
                  <i
                    className={classNames({
                      'fas fa-sort': currentSort !== 'name',
                      'fas fa-sort-up':
                        currentOrder === 'asc' && currentSort === 'name',
                      'fas fa-sort-down':
                        currentOrder === 'desc' && currentSort === 'name',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={getSortParams('sex')}>
                <span className="icon">
                  <i
                    className={classNames({
                      'fas fa-sort': currentSort !== 'sex',
                      'fas fa-sort-up':
                        currentOrder === 'asc' && currentSort === 'sex',
                      'fas fa-sort-down':
                        currentOrder === 'desc' && currentSort === 'sex',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={getSortParams('born')}>
                <span className="icon">
                  <i
                    className={classNames({
                      'fas fa-sort': currentSort !== 'born',
                      'fas fa-sort-up':
                        currentOrder === 'asc' && currentSort === 'born',
                      'fas fa-sort-down':
                        currentOrder === 'desc' && currentSort === 'born',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={getSortParams('died')}>
                <span className="icon">
                  <i
                    className={classNames({
                      'fas fa-sort': currentSort !== 'died',
                      'fas fa-sort-up':
                        currentOrder === 'asc' && currentSort === 'died',
                      'fas fa-sort-down':
                        currentOrder === 'desc' && currentSort === 'died',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {(!currentSort
          ? people
          : updatedList.sort((p1, p2) => peopleSort(p1, p2))
        ).map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={person.slug === slug ? 'has-background-warning' : ''}
          >
            <td>
              <Link
                to={person.slug}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{findMotherInPeople(person)}</td>
            <td>{findFatherInPeople(person)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
