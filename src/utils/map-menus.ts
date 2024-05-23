import type { RouteRecordRaw } from 'vue-router'

// 加载本地路由
function loadLocalRoutes() {
  // 动态获取所有的路由对象,放到数组中
  // 路由对象都在独立的文件中
  // 从文件中将所有的路由对象先读取数组中
  const localRoutes: RouteRecordRaw[] = []
  // 读取router/main当中所有的ts文件
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )

  // 将加载的对象放到localRoutes里面
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

// 第一个菜单路由
export let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]) {
  // 加载本地路由=>完整的路由
  const localRoutes = loadLocalRoutes()

  // 根据菜单去匹配正确的路由，将用户的权限和完整路由对比，筛选出用户正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 1.给route的顶层菜单增加重定向功能（但是只需要添加一次即可）
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        // 2.二级菜单加到路由里面
        routes.push(route)
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }

  return routes
}

// 根据路径去匹配需要显示的菜单
// path：需要匹配的路径
// userMenus：所有的菜单
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  // 定义面包屑
  const breadcrumbs: any[] = []
  // 遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 1.顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        // 2.匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
