import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
// import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasPeopleFilter, setHasPeopleFilter] = useState(false);
  // const [searchParams] = useSearchParams();

  // const gender = searchParams.get('genderFilter');
  // const query = searchParams.get('query');
  // const century = searchParams.getAll('centuryFilter');

  useEffect(() => {
    setIsLoading(true);

    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(response => response.json())
      .then(data => setPeople(data))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  // function filterePeople() {
  //   const filteredPeople = [...people];

  //   if (gender === 'all') {

  //   }
  // }

  const updatedList = !hasPeopleFilter ? [...people] : [...people];

  return (
    <div className="section">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters setHasPeopleFilter={setHasPeopleFilter} />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {updatedList.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              <PeopleTable updatedList={updatedList} people={people} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
