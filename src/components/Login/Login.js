import React, { useReducer, useState, useEffect, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../state/auth-context';
import Input from '../Input/Input';

const emailReducer = (state, action) => {

  if(action.type === 'USER_INPUT') {
    return {value : action.val, isValid: action.val.includes('@')};
  } else if (action.type === 'INPUT_BLUR') {
    return {value : state.value, isValid: state.value.includes('@')}
  }
  return {value : '', isValid: false}
}

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return {value : action.val, isValid: action.val.trim().length > 6 };
  } else if (action.type === 'INPUT_BLUR') {
    return {value : state.value, isValid: state.value.trim().length > 6 }
  }
  return {value : '', isValid : false}
}

const Login = (props) => {
  const authCtx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value : '', valid : false});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value : '', valid : false});

  const emailRef = useRef();
  const passwordRef = useRef();

  const emailChangeHandler = (event) => {
    dispatchEmail({type : 'USER_INPUT', val : event.target.value});
  };

  const {isValid : isValidEmail} = emailState;
  const {isValid : isValidPassword} = passwordState;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFormIsValid(
        isValidEmail && isValidPassword
      );
    }, 500);


    return () => {
      clearTimeout(timeoutId);
    }
  }, [isValidEmail, isValidPassword]);

  const passwordChangeHandler = (event) => {
    dispatchPassword({type : 'USER_INPUT', val : event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type : 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (isValidEmail) {
        emailRef.current.focus();
    } else {
      passwordRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          ref={emailRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={isValidEmail}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
       
          <Input
            ref={passwordRef}
            type="password"
            id="password"
            label="Password"
            value={passwordState.value}
            isValid={isValidPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
