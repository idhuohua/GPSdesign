import { ModifierKey } from '@antv/x6-common'
import { CellView, Edge, Graph } from '@antv/x6'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Selection } from '@antv/x6-plugin-selection'
import { Transform } from '@antv/x6-plugin-transform'
import { History } from '@antv/x6-plugin-history'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import GraphStore from '@/store/graphStore'
import { MessageInstance } from 'antd/es/message/interface'

export const MethodPortPosition: {
  LT: number
  RB: number
} = {
  LT: 60, // left top
  RB: 60, // right bottom
}

export const graphPlugInInit = (
  graph: Graph,
  graphStore: GraphStore,
  messageApi: MessageInstance
) => {
  // 对齐线
  graph.use(new Snapline(snaplineOptions))
  // 框选，框选监听在MainGraph.tsx中
  graph.use(new Selection(selectionOptions))
  // 图形变换
  graph.use(
    new Transform({
      resizing: transformOptions,
    })
  )
  // 撤销重做
  graph.use(new History(historyOptions))
  // 复制粘贴
  // TODO：useLocalStorage问题排查
  graph.use(new Clipboard(clipBoardOptions))
  // 快捷键
  graph.use(new Keyboard(keyboardOptions))
  customKeyBind(graph, graphStore, messageApi)
}

export const edgeInteractionHandler = (
  isNew: boolean,
  edge: Edge,
  messageApi: MessageInstance
) => {
  edge.attr({
    line: {
      stroke: 'gray', // 设置线的颜色为灰色
      strokeWidth: 2, // 设置线的宽度
      // strokeDasharray: 5,
      targetMarker: 'circle',
    },
  })
  if (isNew) {
    // 如果连线成功（新的边被创建）
    messageApi.success(
      `${edge['store']['data']['source']['cell']}---${edge['store']['data']['target']['cell']}`
    )
  }
}

/* interface Options {
  enabled?: boolean
  modifiers?: ModifierKey
  eventTypes?: ('leftMouseDown' | 'rightMouseDown' | 'mouseWheel')[]
} */

// https://x6.antv.antgroup.com/api/graph/panning

export const panningOptions = {
  enabled: true,
  modifiers: ['ctrl', 'alt'] as ModifierKey[],
  eventTypes: ['leftMouseDown'] as (
    | 'leftMouseDown'
    | 'rightMouseDown'
    | 'mouseWheel'
  )[],
}

// -------------------------------------------------------------------------- //

/* interface Options {
  enabled?: boolean
  global?: boolean
  factor?: number
  zoomAtMousePosition?: boolean
  modifiers?: string | ('alt' | 'ctrl' | 'meta' | 'shift')[] | null
  guard?: (this: Graph, e: WheelEvent) => boolean
} */
// https://x6.antv.antgroup.com/api/graph/mousewheel

export const mousewheelOptions = {
  enabled: true,
  global: false,
  factor: 1.05, // 缩放因子
  zoomAtMousePosition: true,
  modifiers: ['ctrl', 'alt'] as ModifierKey[],
}

// -------------------------------------------------------------------------- //

// https://x6.antv.antgroup.com/tutorial/plugins/snapline

export const snaplineOptions = {
  // className: styles['test'],
  enabled: true,
  tolerance: 10,
  sharp: false,
  resizing: true,
  clean: false,
}

// -------------------------------------------------------------------------- //

// https://x6.antv.antgroup.com/tutorial/plugins/selection

export const selectionOptions = {
  enabled: true,
  multiple: true,
  multipleSelectionModifiers: ['shift'] as ModifierKey[],
  strict: false,
  rubberband: true,
  // rubberbandClassName: { ...styleClass(['my-custom-rubberband']) },
  movable: true,
  showNodeSelectionBox: true,
  showEdgeSelectionBox: true,
  // 如果打开 showNodeSelectionBox 时，会在节点上方盖一层元素，导致节点的事件无法响应，此时可以配置 pointerEvents: none 来解决
  pointerEvents: 'none' as 'none' | 'auto',
}

// -------------------------------------------------------------------------- //

// https://x6.antv.antgroup.com/tutorial/plugins/transform

export const transformOptions = {
  enabled: false, // 暂不启用
  minWidth: 300,
  maxWidth: 500,
  minHeight: 42,
  maxHeight: 500,
  orthogonal: true,
  restrict: true,
  preserveAspectRatio: false,
  allowReverse: false,
  autoScroll: true,
}

// -------------------------------------------------------------------------- //

// https://x6.antv.antgroup.com/tutorial/plugins/history#%E9%85%8D%E7%BD%AE

export const historyOptions = {
  enabled: true,
}

// -------------------------------------------------------------------------- //

// https://x6.antv.antgroup.com/tutorial/plugins/clipboard

export const clipBoardOptions = {
  enabled: false,
  useLocalStorage: false,
}

// -------------------------------------------------------------------------- //

// https://x6.antv.antgroup.com/tutorial/plugins/keyboard

export const keyboardOptions = {
  enabled: true,
}
export const customKeyBind = (
  targetGraph: Graph,
  graphStore: GraphStore,
  messageApi: MessageInstance
) => {
  targetGraph.bindKey('ctrl+z', () => {
    targetGraph.undo() // 撤销
    messageApi.info({ content: '撤销' })
  })
  targetGraph.bindKey('ctrl+y', () => {
    targetGraph.redo() // 重做
    messageApi.info({ content: '重做' })
  })
  targetGraph.bindKey('delete', () => {
    graphStore.selectedCell.forEach((cell) => cell.remove()) // 删除
    messageApi.info({ content: '删除' })
  })
  // targetGraph.bindKey('ctrl+c', () => {
  //   const cells = targetGraph.getSelectedCells()
  //   if (cells.length) {
  //     targetGraph.copy(cells) // 复制
  //     messageApi.info({ content: '已复制至剪贴板' })
  //   }
  //   return false
  // })
  // targetGraph.bindKey('ctrl+v', () => {
  //   if (!targetGraph.isClipboardEmpty()) {
  //     const cells = targetGraph.paste({ offset: 32 })
  //     targetGraph.cleanSelection()
  //     targetGraph.select(cells) // 粘贴
  //     messageApi.info({ content: '粘贴' })
  //   }
  //   return false
  // })
}

// -------------------------------------------------------------------------- //

// https://x6.antv.antgroup.com/tutorial/basic/interacting

export const connectingOptions = {
  allowBlank: false, // 不允许连接到画布空白位置的点
  allowNode: false, // 不允许边连接到节点（非节点上的连接桩）
  highlight: true,
  connector: {
    name: 'smooth', // 全局连接边贝塞尔曲线
    args: {
      direction: 'H',
    },
  },
  validateConnection({ sourceCell, targetCell, sourceMagnet, targetMagnet }) {
    // 不能连接自身
    if (sourceCell === targetCell) {
      return false
    }

    // 只能从 out 连接桩开始连接，连接到 in 连接桩
    if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === 'in') {
      return false
    }
    if (!targetMagnet || targetMagnet.getAttribute('port-group') !== 'in') {
      return false
    }

    // 不能重复连线
    const edges = this.getEdges()
    const portId = targetMagnet.getAttribute('port')
    if (edges.find((edge) => edge.getTargetPortId() === portId)) {
      return false
    }
    return true
  },
}
// -------------------------------------------------------------------------- //
// https://x6.antv.antgroup.com/zh/examples/edge/edge/#edge
// export const edgeAtrrs = {

// }

// -------------------------------------------------------------------------- //

// https://x6.antv.antgroup.com/api/registry/highlighter

export const highlightingOptions = {
  // 当连接桩可以被链接时，在连接桩外围渲染一个 2px 宽的矩形框
  // magnetAvailable: {
  default: {
    name: 'stroke',
    args: {
      padding: 4,
      attrs: {
        strokeWidth: 1,
        // stroke: 'rgba(252, 182, 96, 0.7)',
        stroke: 'red',
        rx: 3,
        ry: 3,
      },
    },
  },
}

// -------------------------------------------------------------------------- //

// https://x6.antv.antgroup.com/tutorial/basic/interacting

export const interactingOptions = (graphStore: GraphStore) => {
  return {
    nodeMovable() {
      return graphStore.nodesMovable
    },
  }
}

// -------------------------------------------------------------------------- //
