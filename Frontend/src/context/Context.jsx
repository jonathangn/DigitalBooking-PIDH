import React, { useMemo } from "react";
import { getToken, decodeToken } from "../Helpers/auth";

const Context = React.createContext();

function Provider(props) {

  const [warning, setWarning] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(getToken());

  const { user: decodedUser, isAdmin, isExpired } = useMemo(() => decodeToken(token), [token])

  const auth = !!token;
  const admin = isAdmin;
  const decodedToken = decodedUser;

  return (
    <Context.Provider
      value={{
        auth,
        token,
        setToken,
        user,
        setUser,
        admin,
        warning,
        setWarning,
        decodedToken,
        isExpired,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, Provider };
