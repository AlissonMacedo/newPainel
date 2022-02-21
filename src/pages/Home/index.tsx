import React from 'react';
import { useAuth } from '../../hooks/auth';

const Home: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <>
      <h1>Home</h1>
      <button type="button" onClick={() => signOut()}>
        Sair
      </button>
    </>
  );
};

export default Home;
