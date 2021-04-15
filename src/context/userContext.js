import React from "react";

const UserContext = React.createContext(); //Returns a context object
UserContext.displayName = 'UserContext'; //Good practice to give each context a explicit name
export default UserContext;
