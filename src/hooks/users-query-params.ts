import {useCallback, useEffect} from 'react';
import {NumberParam, StringParam, useQueryParams} from 'use-query-params';
import {useSelector} from 'react-redux';

import {selectAvailable, selectTotal} from '../selectors/users';
import {selectAuthenticated} from '../selectors/auth';
import {
  DEFAULT_FILTER,
  DEFAULT_PAGE,
  DEFAULT_RELATION,
  DEFAULT_SIZE_INDEX,
  Relation,
  UsersQueryParams,
} from './types';
import {isValidPage} from '../utils/pagination';

export const useUsersQueryParams = () => {
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    size: NumberParam,
    relation: NumberParam,
    filter: StringParam,
  });
  const available = useSelector(selectAvailable);
  const total = useSelector(selectTotal);
  const authenticated = useSelector(selectAuthenticated);

  const size: number | undefined =
    query.size && available.includes(query.size) ? query.size : undefined;

  const page: number | undefined =
    query.page &&
    Number.isInteger(query.page) &&
    isValidPage(
      query.page,
      DEFAULT_PAGE,
      total,
      size ?? available[DEFAULT_SIZE_INDEX]
    )
      ? query.page
      : undefined;

  const relation: Relation | undefined =
    authenticated &&
    query.relation &&
    Object.values(Relation).includes(query.relation)
      ? query.relation
      : undefined;

  const filter: string | undefined = query.filter ?? undefined;

  useEffect(() => {
    const fixedQuery: UsersQueryParams = {};

    if ((page || query.page) && page !== query.page) {
      fixedQuery.page = page;
    }

    if ((size || query.size) && size !== query.size) {
      fixedQuery.size = size;
    }

    if ((relation || query.relation) && relation !== query.relation) {
      fixedQuery.relation = relation;
    }

    if ((filter?.length || query.filter?.length) && filter !== query.filter) {
      fixedQuery.filter = filter;
    }

    if (Object.values(fixedQuery).length) {
      setQuery(fixedQuery, 'replaceIn');
    }
  }, [setQuery, query, filter, page, relation, size]);

  const setPage = useCallback(
    (page: number) => {
      setQuery({page: page === DEFAULT_PAGE ? undefined : page}, 'pushIn');
    },
    [setQuery]
  );

  const setSize = useCallback(
    (size: number) => {
      setQuery(
        {
          page: undefined,
          size: size === available[DEFAULT_SIZE_INDEX] ? undefined : size,
        },
        'pushIn'
      );
    },
    [available, setQuery]
  );

  const setRelation = useCallback(
    (relation: Relation) => {
      setQuery(
        {
          page: undefined,
          relation: relation === DEFAULT_RELATION ? undefined : relation,
        },
        'pushIn'
      );
    },
    [setQuery]
  );

  const setFilter = useCallback(
    (filter: string) => {
      setQuery(
        {
          page: undefined,
          filter: filter === DEFAULT_FILTER ? undefined : filter,
        },
        'pushIn'
      );
    },
    [setQuery]
  );

  return {
    page: page ?? DEFAULT_PAGE,
    size: size ?? available[DEFAULT_SIZE_INDEX],
    relation: relation ?? DEFAULT_RELATION,
    filter: filter ?? DEFAULT_FILTER,
    setPage,
    setSize,
    setRelation,
    setFilter,
  };
};
