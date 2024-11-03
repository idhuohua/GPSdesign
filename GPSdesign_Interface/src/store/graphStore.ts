import { RootContext } from '@/App.context'
import { makeAutoObservable } from 'mobx'
import { Cell, Graph } from '@antv/x6'

export default class GraphStore {
  public context: RootContext

  public graph: Graph
  public selectedCell: Cell[] = [] // 选中的Cell数组
  public nodesMovable = true // 节点是否可移动

  public analysisCallTime = 0 // 最小demo用

  constructor(context: RootContext) {
    this.context = context
    makeAutoObservable(this, {}, { autoBind: true })
  }

  // 更新框选中的元素
  selectedCellUpdate = (cells: Cell[]) => {
    if (cells.length === 0 && this.selectedCell.length === 0) {
      return
    }
    this.selectedCell = [...cells]
  }

  // 设置画布中的节点是否可移动
  setNodesMovable = (movable: boolean) => {
    this.nodesMovable = movable
  }
  findEdge = (sourceCellid: string, targetCellid: string) => {
    const edges = this.graph.getEdges()
    return edges.find((edge) => {
      const source = edge.getSourceCellId()
      // console.log('source:', source)
      const target = edge.getTargetCellId()
      // console.log('target:', target)
      // console.log(source === sourceCellid && target === targetCellid)
      return source === sourceCellid && target === targetCellid
    })
  }
}
