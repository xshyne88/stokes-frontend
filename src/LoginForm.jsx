import React from 'react';

const loginFunc = (props) =>
    props.login({variables: {input: {email: "chase@chase.com", password: "abc123456"}}}).then(e => console.log(e)).catch(e => console.error(e))

const LoginForm = (props) => {
    return <div onClick={e => loginFunc(props)}>In Login Form</div>
}

export default LoginForm;
