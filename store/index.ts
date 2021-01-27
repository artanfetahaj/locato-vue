import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { $auth } from '@/utils/api'

export const state = () => ({
  auth: $auth,
  showAuthModal: false,
  authModalType: 'login',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    isAuthenticated: state => state.auth.loggedIn,
    loggedInUser: state => state.auth.user,
    showAuthModal: state => state.showAuthModal,
    authModalType: state => state.authModalType,
}

export const mutations: MutationTree<RootState> = {
  CHANGE_MODAL_TYPE: (state, type: 'login' | 'register') => (state.authModalType = type),
  SHOW_AUTH_MODAL: (state, show: boolean) => (state.showAuthModal = show),
}

export const actions: ActionTree<RootState, RootState> = {}