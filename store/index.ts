import { Store, GetterTree, ActionTree, MutationTree } from 'vuex'
import { User } from '@/models/User'
import { initialiseStores } from '~/utils/auth-store-accessor'
const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]
export * from '~/utils/auth-store-accessor'

export const state = () => ({
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}


export const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit({ dispatch, commit }, { req, res, app }) {
        console.log('app', app.$cookies.get('access'));
        
      // access $axios here
        const token = app.$cookies.get('access');
        let user: User | null = app.store.getters['Auth/loggedInUser'];

        if (! token) {
          dispatch('Auth/userDeauthenticated');
        }

        console.log('user', user);

        if (token && !user) {
            app.$axios.setToken(token, 'Bearer')
            await app.$axios.get('/user').then((response: any) => {
                console.log(response.data as User);
                user = response.data as User;
                dispatch('Auth/userAuthenticated', user);
            }).catch((e: any) => {
                console.log(e);
                app.$cookies.remove('access');
                dispatch('Auth/userDeauthenticated', user);
            });
        }
    }
  }
// import cookie from 'cookie'

// export const actions: ActionTree<S, R> = {

//     nuxtServerInit ({dispatch}, context) {
//         return new Promise((resolve, reject) => {
//           const cookies = cookie.parse(context.req.headers.cookie || '')
//           if (cookies.hasOwnProperty('x-access-token')) {
//             setAuthToken(cookies['x-access-token'])
//             dispatch('auth/fetch')
//               .then(result => {
//                 resolve(true)
//               })
//               .catch(error => {
//                 console.log('Provided token is invalid:', error)                       
//                 resetAuthToken()
//                 resolve(false)
//               })
//           } else {
//             resetAuthToken()
//             resolve(false)
//           }
//         })
//       }

// }
// import { GetterTree, ActionTree, MutationTree } from 'vuex'
// import { $auth } from '@/utils/api'

// export const state = () => ({
//   auth: $auth,
//   showAuthModal: false,
//   authModalType: 'login',
// })

// export type RootState = ReturnType<typeof state>

// export const getters: GetterTree<RootState, RootState> = {
//     isAuthenticated: state => state.auth.loggedIn,
//     loggedInUser: state => state.auth.user,
//     showAuthModal: state => state.showAuthModal,
//     authModalType: state => state.authModalType,
// }

// export const mutations: MutationTree<RootState> = {
//   CHANGE_MODAL_TYPE: (state, type: 'login' | 'register') => (state.authModalType = type),
//   SHOW_AUTH_MODAL: (state, show: boolean) => (state.showAuthModal = show),
// }

// export const actions: ActionTree<RootState, RootState> = {}