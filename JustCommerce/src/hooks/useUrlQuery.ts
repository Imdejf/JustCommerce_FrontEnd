import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';

export const useUrlQuery = () => {
  const location = useLocation();
  const { push } = useHistory();

  const query = useMemo(() => {
    const searchItemsArray = location.search ? location.search.replace('?', '').split('&') : [];
    const queries = searchItemsArray.map((serachItem) => {
      const [name, value, pl] = serachItem.split('=');
      return { name, value,pl };
    });
    return queries;
  }, [location.search]);

  const changeQuery = useCallback(
    (queryItems: Array<{ name: string; value: string; }>) => {
      const searchParameters = new URLSearchParams();
      queryItems.forEach((item) => {
        searchParameters.append(item.name, item.value);
      });
      push(location.pathname + '?' + searchParameters.toString());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.pathname]
  );

  return { changeQuery, query };
};
