import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// import MkAvatar from "../packages/MkAvatar";
import MkElement from "../lib/vue-ele-com";
import App from './App.vue'

Vue.use(ElementUI);
Vue.use(MkElement)
// Vue.use(MkAvatar)

new Vue({
  render: h => h(App),
}).$mount('#app')
