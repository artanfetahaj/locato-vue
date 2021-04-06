import { Module, VuexModule, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import { User } from '@/models/User';
import cookies from 'js-cookie';


@Module({
  name: 'Auth',
  namespaced: true,
  stateFactory: true,
})
export default class Auth extends VuexModule {
  Auth: User | null = null;
  authModalVisible: boolean = false;
  currentAuthModalType: 'login' | 'register' = 'login';

  @Mutation
  public USER_AUTHENTICATED(user: User) {
    console.log('USER_AUTHENTICATED');
    this.Auth = user;
  };

  @Mutation
  public USER_DEAUTHENTICATED(payload: any) {
    console.log('USER_DEAUTHENTICATED');
    if (this.Auth !== null && this.Auth !== undefined) {
      cookies.remove('access');
      console.log('hier', cookies.get('access'))
    } 
    
    this.Auth = null;
  };

  @Mutation
  public showAuthModal(show: boolean) {
    this.authModalVisible = show;
  };

  @Mutation
  public ChangeModalType(type: 'login' | 'register') {
    this.currentAuthModalType = type;
  };

  @Action({ commit: 'USER_AUTHENTICATED' })
  userAuthenticated(payload: User) {
    return payload;
  };

  @Action({ commit: 'USER_AUTHENTICATED' })
  userFetched(payload: User) {
    return payload;
  };

  @Action({ commit: 'USER_DEAUTHENTICATED' })
  userDeauthenticated(payload: any) {
    return payload;
  };
  
  protected get isAuthenticated(): boolean {
    return !! this.Auth;
  };

  protected get loggedInUser(): User | null {
    return this.Auth;
  };

  protected get authModalIsVisible(): boolean {
    return this.authModalVisible;
  };

  protected get authModalType(): 'login' | 'register' {
    return this.currentAuthModalType;
  };
}