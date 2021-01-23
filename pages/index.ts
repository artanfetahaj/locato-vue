import { Component, Vue, Prop } from 'vue-property-decorator';
//eslint-disable
import MainHeader from '~/components/MainHeader.vue';

@Component<Home>({
  components: {
    'main-header': MainHeader,
  }
})
export default class Home extends Vue {
  protected mounted(): void {}
}