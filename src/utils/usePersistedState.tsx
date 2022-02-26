import { useState, useEffect } from 'react';

const usePersistedState = (key: string) => {
  const [state, setState] = useState();

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default usePersistedState;
