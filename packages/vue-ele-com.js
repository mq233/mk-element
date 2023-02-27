import MkAvatar from "./MkAvatar";

import './index.css'

const components = [MkAvatar]

const install = function (Vue, opts = {}) {
  if (!Vue.prototype.$ELEMENT) {
    console.log('install opts:', opts)
    console.warn('未在 Vue 中检测到 element-ui 的安装，组件注册失败！建议安装 @2.15.13+ 版本。')
    return
  }
  components.forEach(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  MkAvatar,
}
