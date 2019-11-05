import React from 'react';

const LoginForm = (props) => {
  props.login({variables: {email: "chase@chase.com", password: "abc123456"}})
  return <div>In Login Form</div>
}

export default LoginForm;