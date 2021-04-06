import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Auth from '@/store/Auth'

let auth: Auth

function initialiseStores(indexedStore: Store<any>): void {
  auth = getModule(Auth, indexedStore)
}

export { initialiseStores, auth }