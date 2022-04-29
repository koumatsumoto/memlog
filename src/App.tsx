import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import './App.css';
import { ENV } from './environments';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently()
        .then((token) => setAccessToken(token))
        .catch(console.error);
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated && user) {
    console.log('isAuthenticated', { user });

    return (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    );
  } else {
    return <div>Not Logged In</div>;
  }
};

function App() {
  return (
    <main className="App">
      <header className="App-header">
        <p>
          memlog<small>@{ENV.version}</small>
        </p>
      </header>
      <div>
        <LoginButton />
        <Profile />
      </div>
    </main>
  );
}

export default App;
