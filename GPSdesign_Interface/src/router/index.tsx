import { RouteObject } from 'react-router-dom'
import React, { lazy, ReactNode, Suspense } from 'react'
const Graph = lazy(() => import('@/pages/graph/Graph'))

const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<div>loading</div>}>{children}</Suspense>
}
const router: RouteObject[] = [
  {
    path: '/',
    children: [{ path: '/graph', element: lazyLoad(<Graph />) }],
  },
]

export default router
