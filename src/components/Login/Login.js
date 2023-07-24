import React, { useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {

  if(action.type === 'USER_INPUT') {
    return {value : action.val, isValid: action.val.includes('@')};
  } else if (action.type === 'INPUT_BLUR') {
    return {value : state.val, isValid: state.value.includes('@')}
  }
  return {value : '', isValid: false}
}

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return {value : action.val, isValid: action.val.trim().length > 6 };
  } else if (action.type === 'INPUT_BLUR') {
    return {value : state.val, isValid: state.value.trim().length > 6 }
  }
  return {value : '', isValid : false}
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value : '', valid : false});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value : '', valid : false});

  const emailChangeHandler = (event) => {
    dispatchEmail({type : 'USER_INPUT', val : event.target.value});
  };



  // useEffect(() => {
  //   console.log('*************');
  //   const timeoutId = setTimeout(() => {
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);


  //   return () => {
  //   console.log('################');

  //     clearTimeout(timeoutId);
  //   }
  // }, [enteredEmail, enteredPassword]);

  const passwordChangeHandler = (event) => {
    dispatchPassword({action : 'USER_INPUT', val : event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type : 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
