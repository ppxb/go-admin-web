interface Routes {
  [key: string]: Recordable
}

const views = import.meta.glob<Recordable>('~/views/**/*.vue', { eager: true })

export const asyncModulesViews = Object.entries(views).reduce((routes: Routes, [url, importFn]) => {
  if (!/\/(login|components)\//.test(url)) {
    const path = url.replace('~/views/', '')
    routes[path] = importFn
  }
  return routes
}, {})
