import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

import * as service from '../service';

// import { auth, tweets } from './reducers';
import * as reducers from './reducers';
import * as actionCreators from './actions';

// const reducer = combineReducers({
//   auth,
//   tweets,
// });

const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({
  actionCreators,
});

// const thunk = store => next => action => {}

// const thunk = function (store) {
//   return function (next) {
//     return function (action) {
//       if (typeof action === 'function') {
//         return action(store.dispatch, store.getState, extraArgument);
//       }
//       return next(action);
//     };
//   };
// };

const logger = store => next => action => {
  if (action.type) {
    console.group(action.type);
    console.info('dispatching', action, store.getState());
    const result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result;
  }
  return next(action);
};

const timestamp = () => next => action => {
  return next({
    ...action,
    meta: {
      ...action.meta,
      timestamp: Date.now(),
    },
  });
};

const failureRedirects = (router, redirectsMap) => () => next => action => {
  const result = next(action);

  if (action.error) {
    const redirect = redirectsMap[action.payload.status];
    if (redirect) {
      router.navigate(redirect);
    }
  }
  return result;
};

export default function configureStore(preloadedState, { router }) {
  const middleware = [
    thunk.withExtraArgument({ service, router }),
    timestamp,
    failureRedirects(router, { 401: '/login', 404: '/404' }),
    logger,
  ];

  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  return store;
}
