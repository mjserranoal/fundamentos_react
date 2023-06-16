import { useState } from 'react';

import Button from '../shared/Button';
import FormField from '../shared/FormField';

import './LoginPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, uiResetError } from '../../store/actions';
import { getUi } from '../../store/selectors';

function LoginPage() {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const resetError = () => {
    dispatch(uiResetError());
  };

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(authLogin(credentials));
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
