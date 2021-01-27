import { Plugin } from '@nuxt/types'
import { initializeAuth } from '~/utils/auth'

const accessor: Plugin = ({ $auth }) => {
  initializeAuth($auth)
}

export default accessor