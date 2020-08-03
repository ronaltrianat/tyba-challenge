const USER_NOT_FOUND = { code: 999 };
const INVALID_PASSWORD = { code: 998 };
const AUTH_HEADER_IS_REQUIRED = { code: 997 };
const AUTH_HEADER_IS_INVALID = { code: 996 };
const EXPIRED_USER_SESSION = { code: 995 };
const LOGIN_OK = { code: 0 };

const USER_SESSION = "UserSession";
const BEARER_PREFIX = "Bearer ";

module.exports = Object.assign(
  {},
  {
    USER_NOT_FOUND,
    INVALID_PASSWORD,
    AUTH_HEADER_IS_REQUIRED,
    LOGIN_OK,
    USER_SESSION,
    AUTH_HEADER_IS_INVALID,
    EXPIRED_USER_SESSION,
    BEARER_PREFIX,
  }
);
