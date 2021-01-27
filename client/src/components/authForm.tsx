import React, { useState, FormEvent, ChangeEvent } from 'react';
import './styles/authForm.scss'
import ApiService from '../services/apiclient.service'

const AuthForm = () => {
  const initialLogin: { email: string, password: string } = {
    email: '',
    password: ''
  }
  const initialRegister: { name: string, email: string, password: string } = {
    name: '',
    email: '',
    password: ''
  }


  const [isLogin, setIsLogin] = useState(true);
  const [authState, setAuthState] = useState(initialLogin);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('e.target', e.target);

    const { name, value } = e.target;
    setAuthState((prevState) => {
      const newState = {
        ...prevState,
        [name]: value,
      }
      console.log(newState);
      return newState;
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
    const target = e.target as HTMLFormElement;
    target.reset();
    const data = isLogin ? await ApiService.login(authState) : await ApiService.register(authState);
    console.log('DATAAAAAAA', data);
    if (data.error) {
      alert('Wrong password you prick!');
    } else {
      localStorage.setItem('access token', data.accessToken);
    }
    console.log('Submit Clicked', authState);
  }


  const authForm = <div className="auth-form-container">
    <h1>{isLogin ? 'Login' : 'Register'}</h1>
    <form className="auth-form register" onSubmit={handleSubmit} name="register-form">
      <input type="hidden" value="hohoho" />
      {isLogin ? null : <>
        <label htmlFor="name">Name</label>
        <input autoComplete="name" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)} type="text" name="name" />
      </>}

      <label htmlFor="email">Email</label>
      <input name="email" autoComplete="email" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)} type="email" />

      <label htmlFor="password">Password</label>
      <input autoComplete="password" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)} name="password" type="password" />
      {isLogin ? null : <>
        <label htmlFor="confirm-password">Confirm password</label>
        <input autoComplete="new-password" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)} name="confirm-password" type="password" />
      </>}

      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
    </form>
  </div>

  const handleClickAuthType = (islogin: boolean) => {
    setAuthState(islogin ? initialLogin : initialRegister);
    setIsLogin(islogin);
  }

  return (
    <>
      <div className="auth-panel">
        {authForm}
        <div className="auth-buttons">
          <button disabled={isLogin} onClick={() => handleClickAuthType(true)}>Log in</button>
          <button disabled={!isLogin} onClick={() => handleClickAuthType(false)}>Register</button>
        </div>
      </div>
    </>
  )

}

export default AuthForm;