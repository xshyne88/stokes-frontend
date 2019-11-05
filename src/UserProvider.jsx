import React, { useState } from "react";
import { usePrevious } from "./hooks";
import { getCurrentUser } from "./auth/helpers";

const UserContext = React.createContext({
  user: undefined,
  setUser: () => {}
});

const getCachedUserIfAuthenticated = isAuthenticated => {
  if (!isAuthenticated) return undefined;

  return getCurrentUser();
};

const UserProvider = ({ onLogin, onLogout, isAuthenticated, children }) => {
  const cachedUser = getCachedUserIfAuthenticated(isAuthenticated);

  const [user, setUser] = useState(cachedUser);

  const previousUser = usePrevious(user);

  React.useEffect(() => {
    if (!previousUser && user) {
      onLogin && onLogin(user);
    }
  }, [previousUser, user, onLogin]);

  React.useEffect(() => {
    if (previousUser && !user) {
      onLogout && onLogout();
    }
  }, [previousUser, user, onLogout]);

  const contextValue = React.useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
