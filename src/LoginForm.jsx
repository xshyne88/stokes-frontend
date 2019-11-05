import React, { useState } from "react";

const loginFunc = (props, email, password) =>
  props
    .login({
      variables: { input: { email: email, password: password } }
    })
    .then(e => console.log(e))
    .catch(e => console.error(e));

const LoginForm = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(email, password);
    loginFunc(props, email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default LoginForm;
