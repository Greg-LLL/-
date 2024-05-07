/// <reference types="vite/client" />


// 声明.vue文件是组件,未启用vue-Official插件s
declare module "*.vue"{
    import { defineComponent } from "vue"
    const component:defineComponent
    export default component
}