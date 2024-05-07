/// <reference types="vite/client" />


// 声明.vue文件是组件
declare module "*.vue"{
    import { defineComponent, type DefineComponent } from "vue"
    const component:DefineComponent
}