import { Auth } from '@nuxtjs/auth'

let $auth: Auth

export function initializeAuth(authInstance: Auth) {
  $auth = authInstance
}
   
export { $auth }