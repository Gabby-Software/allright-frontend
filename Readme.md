# AllRight authentication system

### _Related links_

- [api documentation](https://documenter.getpostman.com/view/8741108/Tzm5GGb9)

### _Integration_

- The app suppose to load on you subdomain (identity.main-domain.xyz)
- To let the app communicate with you, you will required to configure `/auth` to be a route where you will handle messages from identity app
- For all routes except this `/auth` - redirect user to `identity` subdomain.
- The `/auth` route not have to return anything (can return just null). instead it should import an =d implement [this hook](https://github.com/ColorElephantHQ/allright-frontend/tree/master/src/hooks/authorization.hook.tsk)
- The above hook receive 2 parameters - first is a function which should return boolean for which user logged in or not, second is a function which receive the response from login and save it in localstorage

### _Environment Variables_

- To switch to liveright theme in development, set environment variable REACT_APP_LOCAL_DEV_MODE=liveright, leave it empty for eatright theme.
