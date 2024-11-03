import { Node } from '@antv/x6'
// 引入所需的依赖
import { RootContext } from '@/App.context'
import { makeAutoObservable } from 'mobx'
import { Url } from 'url'

export interface NewNode {
  id: string
  name: string
  type: string
  inPortsID: string
  outPortsID: string
}

// 定义 metaProblem 接口，描述方法的元数据
interface metaProblem {
  ProblemID: string | string[]
  ProblemName: string | string[]
  ProblemType: string // 方法类型（例如：AI/My）
  ProblemData: string
  ProblemLeftID: string
  ProblemRightID: string
}

// 定义 metaSolution 接口，描述资产的元数据
interface metaSolution {
  SolutionID: string | string[]
  SolutionName: string | string[]
  SolutionType: string
  SolutionData: string
  SolutionLeftID: string
  SolutionRightID: string
}

interface metaNodePair {
  ProblemID: string
  SolutionID: string
  Type: string
  IsMatch: string
  Reason: string
}

interface finalProblem {
  ProblemContent: string
  ProblemSource: string[]
}

interface finalSolution {
  SolutionContent: string
  SolutionSource: string[]
}

interface newImages {
  ImageName: string
  Image: string
}

// 定义 MetaStore 类
export default class MetaStore {
  public context: RootContext

  public problems: metaProblem[] = []
  public solutions: metaSolution[] = []
  public nodepairs: metaNodePair[] = []
  public finalproblem: finalProblem = { ProblemContent: '', ProblemSource: [] }
  public finalsolution: finalSolution = {
    SolutionContent: '',
    SolutionSource: [],
  }
  public images: newImages[] = []
  // 类构造器
  constructor(context: RootContext) {
    this.context = context // 存储上下文
    // 使用 MobX 使该类成为自动可观察对象
    makeAutoObservable(this, {}, { autoBind: true })
  }

  updateImages(imageName: string, image: string) {
    const newImage: newImages = { ImageName: imageName, Image: image }
    this.images.push(newImage)
    // console.log('照片存储:', newImage)
  }
  getNodeName = (nodeID) => {
    // 查找问题节点
    const problem = this.problems.find((p) => p.ProblemID === nodeID)
    if (problem) {
      return problem.ProblemName
    }

    // 查找解决方案节点
    const solution = this.solutions.find((s) => s.SolutionID === nodeID)
    if (solution) {
      return solution.SolutionName
    }

    console.warn(`Node with ID ${nodeID} not found.`)
    return null
  }
  // 获取特定节点的数据
  getNodeData = (nodeID) => {
    // 在问题数组中查找节点数据
    const problem = this.problems.find((p) => p.ProblemID === nodeID)
    if (problem) {
      return problem.ProblemData
    }

    // 在解决方案数组中查找节点数据
    const solution = this.solutions.find((s) => s.SolutionID === nodeID)
    if (solution) {
      return solution.SolutionData
    }

    // 如果在两个数组中都找不到，返回 null 或其他默认值
    console.warn(`Node with ID ${nodeID} not found in problems or solutions.`)
    return null
  }
  // 添加一个新问题节点的函数
  updateProblems = (Problem: NewNode) => {
    this.problems.push({
      ProblemID: Problem.id,
      ProblemName: Problem.name,
      ProblemType: Problem.type,
      ProblemData: Problem.type,
      ProblemLeftID: Problem.inPortsID,
      ProblemRightID: Problem.outPortsID,
    })
    // 打印 Problem 对象
    console.log('成功更新problems数组,新的Problem节点参数如下:', Problem)
  }
  // 更新上一个节点的OutPortsID
  updateLastOutPort = (nodeID, newOutPortsID) => {
    // 查找并更新问题节点
    const problemIndex = this.problems.findIndex((p) => p.ProblemID === nodeID)
    if (problemIndex !== -1) {
      this.problems[problemIndex].ProblemRightID = newOutPortsID
      console.log('上个问题节点指向:', newOutPortsID)
      return
    }
    // 查找并更新方案节点
    const solutionIndex = this.solutions.findIndex(
      (s) => s.SolutionID === nodeID
    )
    if (solutionIndex !== -1) {
      this.solutions[solutionIndex].SolutionRightID = newOutPortsID
      console.log('上个方案节点指向:', newOutPortsID)
    } else {
      console.warn(`Node with ID ${nodeID} not found in problems or solutions.`)
    }
  }
  // 添加一个新方案节点的函数
  updateSolutions = (Solution: NewNode) => {
    this.solutions.push({
      SolutionID: Solution.id,
      SolutionName: Solution.name,
      SolutionType: Solution.type,
      SolutionData: Solution.type,
      SolutionLeftID: Solution.inPortsID,
      SolutionRightID: Solution.outPortsID,
    })
    console.log('成功更新solutions数组,新的solution节点参数如下:', Solution)
  }
  // 更新节点数据的通用函数
  updateNodeData = (nodeID, newData) => {
    // 查找并更新问题节点
    const problemIndex = this.problems.findIndex((p) => p.ProblemID === nodeID)
    if (problemIndex !== -1) {
      this.problems[problemIndex].ProblemData = newData
      console.log('更新后的问题节点内容', newData)
      return
    }

    // 查找并更新方案节点
    const solutionIndex = this.solutions.findIndex(
      (s) => s.SolutionID === nodeID
    )
    if (solutionIndex !== -1) {
      this.solutions[solutionIndex].SolutionData = newData
      console.log('更新后的方案节点内容', newData)
      return
    }
    // 如果找不到节点
    console.warn(`Node with ID ${nodeID} not found in problems or solutions.`)
  }
  updateFinalText = (type: string, inputValue: string) => {
    if (type === 'problem') {
      this.finalproblem.ProblemContent = inputValue
      console.log('已保存的最终问题', inputValue)
    } else if (type === 'solution') {
      this.finalsolution.SolutionContent = inputValue
      console.log('已保存的最终方案', inputValue)
    }
  }

  updateFinalTags = (type: string, tags: string[]) => {
    if (type === 'problem') {
      this.finalproblem.ProblemSource = tags
      console.log('已保存的问题标签', tags)
    } else if (type === 'solution') {
      this.finalsolution.SolutionSource = tags
      console.log('已保存的方案标签', tags)
    }
  }
  updateNodePair = (
    problemID: string,
    solutionID: string,
    type: string,
    isMatch: string,
    reason: string
  ) => {
    // 在 nodepairs 数组中查找现有的节点对
    const pairIndex = this.nodepairs.findIndex(
      (np) => np.ProblemID === problemID && np.SolutionID === solutionID
    )

    // 如果找到了现有的节点对，更新其信息
    if (pairIndex !== -1) {
      this.nodepairs[pairIndex] = {
        ProblemID: problemID,
        SolutionID: solutionID,
        Type: type,
        IsMatch: isMatch,
        Reason: reason,
      }
      console.log(
        `Node pair updated: ProblemID: ${problemID}, SolutionID: ${solutionID},Type:${type},IsMatch:${isMatch}`
      )
    } else {
      // 如果没有找到，添加新的节点对
      this.nodepairs.push({
        ProblemID: problemID,
        SolutionID: solutionID,
        Type: type,
        IsMatch: isMatch,
        Reason: reason,
      })
      console.log(
        `New node pair added: ProblemID: ${problemID}, SolutionID: ${solutionID},Type:${type},IsMatch:${isMatch}`
      )
    }
  }
}
