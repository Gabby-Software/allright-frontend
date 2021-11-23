import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';

export default function useReferral() {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const refParam = searchParams.get('ref');
    if (refParam) {
      localStorage.setItem('eatright-ref', refParam);
      searchParams.delete('ref');

      history.replace({
        search: searchParams.toString(),
      });
    }
  }, [ location.search ]);
}
