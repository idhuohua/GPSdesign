import { CSSProperties, FC, ReactNode } from 'react'
import { Graph } from '@antv/x6'
import { useStyles } from '@/hooks/styles'
import { useGraphStore } from '@/hooks'

// 在此区域内禁用画布的节点选择、节点移动、键盘事件
interface IStaticLayout {
  children?: ReactNode
  // className?: string
  // style?: CSSProperties
}
export const StaticLayout: FC<IStaticLayout> = ({
  children,
  // className,
  // style,
}) => {
  const styleClass = useStyles()
  const graphStore = useGraphStore()
  const onMouseEnter = () => {
    graphStore.graph.disableSelection()
    graphStore.graph.disableKeyboard()
    graphStore.setNodesMovable(false)
  }
  const onMouseLeave = () => {
    graphStore.graph.enableSelection()
    graphStore.graph.enableKeyboard()
    graphStore.setNodesMovable(true)
  }
  return (
    <div
      // {...styleClass([], {}, { className, style })}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
    >
      {children}
    </div>
  )
}
