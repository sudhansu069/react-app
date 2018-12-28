import { dispatch } from "rxjs/internal/observable/range";
import {USER_LOGGED_IN} from '../types';
import api from '../api';
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const userLoggedIn =(user) => ({
    type : USER_LOGGED_IN,
    user
});

//export const login =(credentials )=> applicationCache.user.login(credentials).then(user=>dispatch(userLoggedIn(user)));

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.bookwormJWT = user.token;
    setAuthorizationHeader(user.token);
    dispatch(userLoggedIn(user));
  });