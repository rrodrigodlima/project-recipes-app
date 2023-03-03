/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

export default function Login() {
  const [isValid, setIsValid] = useState(true);
  const history = useHistory();
  const { user, setUser } = useContext(RecipesContext);

  const validation = () => {
    const number = 6;
    const emailRegex = /^[\w+.]+@\w+\.com$/;
    const pass = user.password.length > number && emailRegex.test(user.email);
    setIsValid(!pass);
  };

  useEffect(() => {
    validation();
  }, [user]);

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    history.push('/meals');
  };

  return (
    <div>
      <input
        data-testid="email-input"
        type="email"
        id="email"
        placeholder="email"
        onChange={ ({ target }) => setUser({ ...user, email: target.value }) }
      />
      <input
        data-testid="password-input"
        type="password"
        id="password"
        placeholder="password"
        onChange={ ({ target }) => setUser({ ...user, password: target.value }) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isValid }
        onClick={ handleClick }
      >
        Enter
      </button>
    </div>
  );
}