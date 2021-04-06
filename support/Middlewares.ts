/* eslint-disable */
// FIXME: NEEDS PROPER TYPING
import { Route } from 'vue-router';
import { isArray } from 'lodash';
import { isUndefined } from 'lodash';

// Middlewares are executed serially in the order they are supplied, respecting asynchronous ones.
// Middleware execution will stop when all passed Middlewares are executed OR when any middleware calls next() with an argument other than undefined
// When a middleware calls next() with an argument other than undefined, that argument will be passed to VueRouter.

function evaluateMiddleware(middlewares: any[], to: Route, from?: Route, next?: any) {
  // clone the array so we do not accidentally modify it
  const remainingMiddleware = middlewares.slice(0);
  const nextMiddleware = remainingMiddleware.shift();
  console.log('remainingMiddleware', remainingMiddleware);
  console.log('nextMiddleware', nextMiddleware);


  if (isUndefined(nextMiddleware)) {
    // No more Middlewares left to check, and they all passed,
    next();
    return;
  }

  nextMiddleware(to, from , (nextArgument: any) => {

    if (isUndefined(nextArgument)) {
      // next doesnt have arguments => middleware passed => check next middleware
      evaluateMiddleware(remainingMiddleware, to, from, next);
      return;
    }

    // next has arguments, which means the middleware failed, redirect.
    next(nextArgument);
  })
}


export default (middlewares: any[]) => {
  if (!isArray(middlewares)) {
    throw new Error('You must specify an array of Middlewares');
  }

  console.log('middlewares', middlewares);


  return (to: Route, from?: Route, next?: any) => {
    console.log('HER');

    return evaluateMiddleware(middlewares, to, from, next);
  };
};
