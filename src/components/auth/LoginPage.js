import { useState } from 'react';

import Button from '../shared/Button';
import FormField from '../shared/FormField';
import { login } from './service';

import './LoginPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context';

function LoginPage() {
  const { onLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const resetError = () => {
    setError(null);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    resetError();
    setIsLoading(true);
    try {
      await login(credentials);
      setIsLoading(false);
      // Logged in
      onLogin();
      // Redirect to pathname
      const to = location.state?.from?.pathname || '/';
      navigate(to);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const handleChange = event => {

    let valor = event.target.value;

    if (event.target.name === 'remember') {
      valor = event.target.checked;
    }

    setCredentials({
      ...credentials,
      [event.target.name]: valor,
    });
  };

  const buttonDisabled =
    isLoading || !credentials.email || !credentials.password;

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Nodepop</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="email"
          className="loginForm-field"
          onChange={handleChange}
          value={credentials.email}
          autofocus
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginForm-field"
          onChange={handleChange}
          value={credentials.password}
        />
        <FormField
          type="checkbox"
          name="remember"
          label="remember me!"
          className="loginForm-field"
          onChange={handleChange}
          checked={credentials.remember}
        />
        <Button
          type="submit"
          variant="primary"
          className="loginForm-submit"
          disabled={buttonDisabled}
        >
          Log in
        </Button>
      </form>
      {error && (
        <div onClick={resetError} className="loginPage-error">
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
