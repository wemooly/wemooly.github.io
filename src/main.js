// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from "vue-resource"

Vue.config.productionTip = false

Vue.use(VueResource);
//全局的Vue.directive里面第二个参数都是函数
// Vue.directive("rainbow",{
//    bind(el,binding,vnode){
//      el.style.color = "#" + Math.random().toString(16).slice(2,8);
//    }
// })

// Vue.directive("theme",{
//   bind(el,binding,vnode){
//     if(binding.value == "wide"){
//       el.style.maxWidth = "1200px";
//     }else if(binding.value == "narrow"){
//       el.style.maxWidth = "560px";
//     }
//     if(binding.arg=="columu"){
//       el.style.background = "#6677cc";
//       el.style.padding = "20px";
//     }
//   }
// })

//自定义过滤器   第一个参数为 管道右侧的名字  第二个参数为函数 value为管道左侧的内容
// Vue.filter("toUpperCase",value=>{
//    return value.toUpperCase();
// })
// 让显示值的一部分 多余的用...表示
// Vue.filter("lessContent",value=>{
//   return value.slice(0,100)+"..."
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
