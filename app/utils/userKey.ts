'use strict';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

const USER_KEY_COOKIE = 'user_key';

export function getUserKey(): string {
  let userKey = Cookies.get(USER_KEY_COOKIE);
  if (!userKey) {
    userKey = uuidv4();
    Cookies.set(USER_KEY_COOKIE, userKey, { expires: 365 });
  }
  return userKey;
}
