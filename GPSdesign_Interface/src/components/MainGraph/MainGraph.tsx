import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Graph, Node as X6Node } from '@antv/x6'
import { IGraph } from '@/components/MainGraph/IMainGraph'
import lang from './MainGraph.i18n.json'
import { observer } from 'mobx-react'
import {
  connectingOptions,
  edgeInteractionHandler,
  graphPlugInInit,
  highlightingOptions,
  interactingOptions,
  mousewheelOptions,
  panningOptions,
} from '@/components/MainGraph/GraphOptions'
import { useLang } from '@/hooks/i18n'
import { useAppStore, useGraphStore, useMetaStore, useUserStore } from '@/hooks'
import { useColorVar, useStyles } from '@/hooks/styles'
import {
  switchLanguage,
  addProblem,
  addSolution,
} from '@/components/MainGraph/utils'
import throttle from 'lodash/debounce'
import debounce from 'lodash/debounce'
import { Input, message, notification, Segmented } from 'antd'
import { Button } from '@/components/universal/Button/Button'
import ReactDOM from 'react-dom/client'
import styles from './MainGraph.module.scss'
import {
  MyComponent1,
  MyComponent2,
  AIComponent1,
  AIComponent2,
} from '@/components/MainGraph/NewComponent'
import { PortTooltip } from '@/components/MainGraph/PortTooltip'
import { SvgIcon } from '@/components/icons'
import { OpenAI } from '@/components/icons/OpenAI'
import { User } from '@/components/icons/User'
import { Header } from '@/components/0Header/Header'
import { EditLayout } from '@/components/EditLayout/EditLayout'
import {
  FinalProblem,
  FinalSolution,
} from '@/components/FinalEditor/FinalEditor'
import { Button as AntDButton, Select, Modal } from 'antd'
import { TabBar } from '@/components/universal/TabBar/TabBar'
import {
  BorderInnerOutlined,
  QuestionCircleOutlined,
  SaveOutlined,
} from '@ant-design/icons'
import {
  getProblemToProblemStimulus,
  getSolutionToProblemStimulus,
  getProblemToSolutionStimulus,
  getSolutionToSolutionStimulus,
  getProblemToProblemImages,
  getSolutionToProblemImages,
  getProblemToSolutionImages,
  getSolutionToSolutionImages,
  start,
  save,
  Evaluate,
  saveImage,
} from '@/service'
import { ImageContent } from '@/components/MainGraph/ImageContent'

export const MainGraph: FC<IGraph> = observer(() => {
  const { t } = useLang(lang, 'MainGraph')
  const c = useColorVar()
  const styleClass = useStyles(styles)
  const refContainer = useRef()
  const appStore = useAppStore()
  const userStore = useUserStore()
  const graphStore = useGraphStore()
  const metaStore = useMetaStore()
  const [messageApi, contextHolder1] = message.useMessage()
  const [api, contextHolder2] = notification.useNotification()

  const [graphSize, setGraphSize] = useState<[number, number]>([
    window.innerWidth,
    window.innerHeight,
  ])
  const [graphTranslate, setGraphTranslate] = useState<[number, number]>([0, 0])
  const [graphScale, setGraphScale] = useState<number>(1)
  // 设置用户名状态
  const [currentUsername, setCurrentUsername] = useState(userStore.user)
  // 新增一个状态来跟踪我的方案节点的数量
  const [mySolutionNodeCount, setMySolutionNodeCount] = useState(0)
  // 新增一个状态来跟踪我的问题节点的数量
  const [myProblemNodeCount, setMyProblemNodeCount] = useState(0)
  // 新增一个状态来跟踪AI方案节点的数量
  const [aiSolutionNodeCount, setAiSolutionNodeCount] = useState(0)
  // 新增一个状态来跟踪AI问题节点的数量
  const [aiProblemNodeCount, setAiProblemNodeCount] = useState(0)
  // 模态tab状态
  const [modalSelectedTab, setModalSelectedTab] = useState('1') // '1' 表示图像，'2' 表示文本
  // AI节点tab状态
  const [aiNodeSelectedTab, setAiNodeSelectedTab] = useState('1') // '1' 表示问题，'2' 表示方案
  // 我的节点tab状态
  const [myNodeSelectedTab, setMyNodeSelectedTab] = useState('1') // '1' 表示问题，'2' 表示方案
  // 连线状态
  const [edgeType, setEdgeType] = useState('default') // 'default','match','mismatch'
  // // 追踪是否有未保存的节点
  const [hasUnsavedNodes, setHasUnsavedNodes] = useState(true)
  // 追踪是否有未保存的最终编辑
  const [hasUnsavedFinal, setHasUnsavedFinal] = useState(true)
  // 追踪是否正在生成节点
  const [isGenerating, setIsGenerating] = useState(false)
  // 追踪是否正在评估节点
  const [isEvaluating, setIsEvaluating] = useState(false)
  // 评估状态
  const [evaluationResult, setEvaluationResult] = useState(null)
  // 添加状态来跟踪当前选中的标签
  const [selectedTab, setSelectedTab] = useState('design')

  const nodeOptions = [
    { label: 'Problem', value: '1' },
    { label: 'Solution', value: '2' },
  ]
  const modalOptions = [
    { label: 'Image', value: '1' },
    { label: 'Text', value: '2' },
  ]
  // 窗口size监听
  const handleResizeWindowDebounce = useCallback(
    debounce(
      () => {
        graphStore.graph.resize(window.innerWidth, window.innerHeight)
        graphStore.graph.centerContent()
      },
      200,
      { leading: false, trailing: true, maxWait: 1000 }
    ),
    []
  )

  const selectedCellsUpdateThrottle = useCallback(
    throttle(
      (graph: Graph) => {
        graphStore.selectedCellUpdate(graph.getSelectedCells())
      },
      100,
      { leading: false, trailing: true, maxWait: 1000 }
    ),
    []
  )
  // 更新选中标签的函数
  const handleTabChange = (tab) => {
    setSelectedTab(tab)
  }
  const showGuidebook = () => {
    Modal.info({
      title: 'guidbook',
      content: (
        <div {...styleClass(['instruction-container'])}>
          {/* <div {...styleClass(['instruction-row'])}>
            {`${`Left-Pressed`}： ${`Translation`}`}
          </div> */}
          <div
            {...styleClass(['instruction-row'])}
          >{`CTRL/ALT + ${`鼠标中键`}：${`缩放`}`}</div>
          <div {...styleClass(['instruction-row'])}>
            {`${`鼠标左键`} + ${`拖动`}：${`框选`}`}
          </div>
          <div {...styleClass(['instruction-row'])}>
            {`${`Shift`} + ${`点选`}：${`框选`}`}
          </div>
        </div>
      ),
    })
  }
  useEffect(() => {
    // 初始化 X6 图表实例并存储在 graphStore 中
    graphStore.graph = new Graph({
      container: refContainer.current, // 图表渲染的容器
      grid: true, // 开启栅格
      width: window.innerWidth, // 设置图表宽度为窗口宽度
      height: window.innerHeight, // 设置图表高度为窗口高度
      background: {
        color: c('white'), // 设置背景颜色
      },
      virtual: true, // 开启虚拟化以提升性能
      scaling: {
        min: 0.35, // 设置最小缩放比例
        max: 2.5, // 设置最大缩放比例
      },
      panning: {
        ...panningOptions, // 设置平移选项，例如 CTRL/ALT 平移
      },
      mousewheel: {
        ...mousewheelOptions, // 设置鼠标滚轮选项，例如 CTRL/ALT 缩放
      },
      connecting: {
        ...connectingOptions, // 设置连接选项
      },
      highlighting: {
        ...highlightingOptions, // 设置高亮选项
      },
      interacting: {
        ...interactingOptions(graphStore), // 设置交互选项
      },
      onPortRendered(args) {
        // 端口渲染回调函数
        const selectors = args.contentSelectors
        const container = selectors && selectors.foContent
        const portGroup = args.port.group
        const tip = portGroup === 'in' ? 'Input' : 'Output'
        // 如果容器存在，渲染端口提示
        if (container) {
          ReactDOM.createRoot(container as HTMLElement).render(
            <PortTooltip portGroup={portGroup as 'in' | 'out'} tip={tip} />
          )
        }
      },
    })

    // 插件初始化
    graphPlugInInit(graphStore.graph, graphStore, messageApi)

    // 添加框选变化监听事件
    graphStore.graph.on('selection:changed', () => {
      selectedCellsUpdateThrottle(graphStore.graph)
    })

    // 添加画布尺寸、缩放、平移的监听事件
    graphStore.graph.on('resize', ({ width, height }) =>
      setGraphSize([width, height])
    )
    graphStore.graph.on('scale', ({ sx }) => setGraphScale(sx))
    graphStore.graph.on('translate', ({ tx, ty }) =>
      setGraphTranslate([Number(tx.toFixed(1)), Number(ty.toFixed(1))])
    )

    // 添加边连接事件监听
    graphStore.graph.on('edge:connected', ({ isNew, edge }) => {
      edgeInteractionHandler(isNew, edge, messageApi)
    })

    // 清理函数，当组件卸载时执行，用于清理资源
    return () => {
      graphStore.graph.dispose() // 销毁图表实例
    }
  }, []) // 空依赖数组意味着此 useEffect 只在组件挂载时执行一次

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindowDebounce)

    return () => {
      window.removeEventListener('resize', handleResizeWindowDebounce)
    }
  }, [])

  useEffect(() => {
    initFirstMethod()
  }, [])
  // 我的节点生成
  const handleMyGenerateClick = async () => {
    const selectedCells = graphStore.graph.getSelectedCells()
    // if (hasUnsavedNodes) {
    //   message.error('The contents of the node are not saved')
    //   return
    // }
    if (isGenerating) {
      message.warning('Node is being generated, please wait...')
      return
    }
    if (isEvaluating) {
      message.warning('Evaluation underway, please wait...')
      return
    }
    // setHasUnsavedNodes(true)
    if (selectedCells.length === 1) {
      const lastSelected = selectedCells[selectedCells.length - 1]
      const position = lastSelected.getBBox()
      const newPosition = {
        x: position.x + 500 + Math.random() * 500,
        y: position.y,
      }
      // 生成新的节点数据
      const newID =
        myNodeSelectedTab === '1'
          ? `My-Problem-${myProblemNodeCount + 1}`
          : `My-Solution-${mySolutionNodeCount + 1}`
      console.log('newID:', newID)
      const selectedNodeID = `${
        selectedCells
          .filter((cell) => cell.isNode()) // 筛选出节点
          .map((node) => node.id) // 获取节点的 ID
      }` // 选中节点的ID
      console.log('SelectedID:', selectedNodeID)
      const SelectedNodeType = metaStore.getNodeName(selectedNodeID)
      setIsGenerating(true) // 设置正在生成的标志
      if (myNodeSelectedTab === '1') {
        // 如果选中“问题”，则添加 MyComponent1
        // 为了加入problems数组而新建的数据对象
        const newProblemID = newID // 新问题节点的ID
        const newProblemData = {
          id: newProblemID, // 唯一标识符
          name: 'problem', // 名称
          type: 'MyDesign_Problem', // 类型
          inPortsID: selectedNodeID,
          outPortsID: 'null',
        }
        console.log('newproblemData:', newProblemData)
        // 更新 metaStore 中的 problems
        metaStore.updateProblems(newProblemData)
        // 更新选中节点的OutPortsID
        metaStore.updateLastOutPort(selectedNodeID, newProblemID)
        if (SelectedNodeType === 'solution') {
          // 更新选中NodePair(s-p)
          metaStore.updateNodePair(
            newProblemID,
            selectedNodeID,
            's-p',
            'default',
            ''
          )
        }
        addProblem({
          graph: graphStore.graph,
          problemID: newProblemData.id,
          component: ({ graph, node }) => (
            <MyComponent1
              graph={graph}
              node={node}
              nodeID={newProblemData.id}
              onSaved={() => setHasUnsavedNodes(false)}
            />
          ),
          position: [newPosition.x, newPosition.y],
        })
        // console.log('成功添加节点')
        // 连接边的代码
        graphStore.graph.addEdge({
          source: {
            cell: newProblemData.inPortsID,
            port: `${newProblemData.inPortsID}-out-port`,
          }, // 源节点和连接桩 ID
          target: {
            cell: newProblemID,
            port: `${newProblemID}-in-port`,
          }, // 目标节点 ID 和连接桩 ID
          attrs: {
            line: {
              stroke: 'gray', // 设置线的颜色为灰色
              strokeWidth: 2, // 设置线的宽度
              // strokeDasharray: 5,
              targetMarker: 'circle',
            },
          },
        })
        // 更新节点计数
        setMyProblemNodeCount((count) => count + 1)
      } else {
        // 如果选中“方案”，则添加 MyComponent2
        // 为了加入solutions数组而新建的数据对象
        const newSolutionID = newID // 新方案节点的ID
        const newSolutionData = {
          id: newSolutionID, // 唯一标识符
          name: 'solution', // 名称
          type: 'MyDesign_Solution', // 类型
          inPortsID: selectedNodeID,
          outPortsID: 'null',
        }
        // 更新 metaStore 中的 solutions
        metaStore.updateSolutions(newSolutionData)
        // 更新选中节点的OutPortsID
        metaStore.updateLastOutPort(selectedNodeID, newSolutionID)
        if (SelectedNodeType === 'problem') {
          // 更新选中NodePair(p-s)
          metaStore.updateNodePair(
            selectedNodeID,
            newSolutionID,
            'p-s',
            'default',
            ''
          )
        }
        addSolution({
          graph: graphStore.graph,
          solutionID: newSolutionData.id,
          component: ({ graph, node }) => (
            <MyComponent2
              graph={graph}
              node={node}
              nodeID={newSolutionData.id}
              onSaved={() => setHasUnsavedNodes(false)}
            />
          ),
          position: [newPosition.x, newPosition.y],
        })
        // 连接边的代码
        graphStore.graph.addEdge({
          source: {
            cell: selectedNodeID,
            port: `${selectedNodeID}-out-port`,
          }, // 源节点和连接桩 ID
          target: {
            cell: newSolutionID,
            port: `${newSolutionID}-in-port`,
          }, // 目标节点 ID 和连接桩 ID
          attrs: {
            line: {
              stroke: 'gray', // 设置线的颜色为灰色
              strokeWidth: 2, // 设置线的宽度
              // strokeDasharray: 5,
              targetMarker: 'circle',
            },
          },
        })
        setMySolutionNodeCount((count) => count + 1)
      }
      setIsGenerating(false) // 在完成后重置生成标志
    } else {
      message.error('Please select a node first')
    }
  }
  // 处理AI图像文本的函数
  const processText = (text) => {
    const bracketPattern = /[\(\（].*?[\)\）]/g
    return text.replace(bracketPattern, '')
  }
  // AI节点生成，接入API
  const handleAiGenerateClick = async () => {
    const selectedCells = graphStore.graph.getSelectedCells()
    // if (hasUnsavedNodes) {
    //   message.error('The contents of the node are not saved')
    //   return
    // }
    if (isGenerating) {
      message.warning('Node is being generated, please wait...')
      return
    }
    if (isEvaluating) {
      message.warning('Evaluation underway, please wait...')
      return
    }
    if (selectedCells.length === 1) {
      const selectedNode = selectedCells[0]
      // console.log(selectedNode.getData())
      const selectedNodeID = `${
        selectedCells
          .filter((cell) => cell.isNode()) // 筛选出节点
          .map((node) => node.id) // 获取节点的 ID
      }` // 选中节点的ID
      const SelectedNodeType = metaStore.getNodeName(selectedNodeID)
      const nodeData = metaStore.getNodeData(selectedNodeID) // 获取节点数据
      console.log('选中节点的名称是:', SelectedNodeType)
      if (aiNodeSelectedTab === '1') {
        // 生成问题节点
        const hide = message.loading('Problem nodes are being generated...', 0) // 显示加载消息
        if (SelectedNodeType === 'problem') {
          // 如果选中的是问题节点
          setIsGenerating(true) // 设置正在生成的标志
          try {
            // p-p逻辑
            const problemContent = nodeData
            let generatedProblems
            if (modalSelectedTab === '1') {
              generatedProblems = await getProblemToProblemImages({
                task: problemContent,
                num: 3,
              })
            } else {
              generatedProblems = await getProblemToProblemStimulus({
                task: problemContent,
                num: 3,
              })
            }
            // 对每个生成的问题进行处理
            for (const [
              index,
              generatedProblem,
            ] of generatedProblems.entries()) {
              const position = selectedNode.getBBox()
              const newPosition = {
                // x: position.x + 500 + Math.random() * 500,
                // y: position.y,
                x: position.x + 500,
                y: position.y + index * 200,
              }
              const newProblemID = `AI-Problem-${
                aiProblemNodeCount + 1 + index
              }`
              // 为了加入problems数组而新建的数据对象
              const newProblemData = {
                id: newProblemID, // 唯一标识符
                name: 'problem', // 名称
                type: 'AIDesign_Problem', // 类型
                inPortsID: selectedNodeID,
                outPortsID: 'null',
              }
              const problemText = processText(generatedProblem.items[0].text)
              // 提取问题图像
              const problemImage = generatedProblem.items[0].image
              // 保存问题图像,处理图像文本
              if (modalSelectedTab === '1') {
                metaStore.updateImages(
                  `${currentUsername}_${newProblemID}`,
                  problemImage
                )
              }
              console.log('AI问题节点ID', newProblemID)
              console.log('生成内容', problemText)
              // 更新 metaStore 中的 problems
              metaStore.updateProblems(newProblemData)
              metaStore.updateNodeData(newProblemID, problemText)
              // 更新选中节点的OutPortsID
              metaStore.updateLastOutPort(selectedNodeID, newProblemID)
              // 添加 AIComponent1 节点
              addProblem({
                graph: graphStore.graph,
                problemID: newProblemID,
                component: (props) => (
                  <AIComponent1
                    {...props}
                    modalSelectedTab={modalSelectedTab}
                    content={problemText}
                    image={problemImage}
                    nodeID={newProblemID}
                  />
                ),
                position: [newPosition.x, newPosition.y],
              })
              // 新建连接边的代码
              graphStore.graph.addEdge({
                source: {
                  cell: newProblemData.inPortsID,
                  port: `${newProblemData.inPortsID}-out-port`,
                }, // 源节点和连接桩 ID
                target: {
                  cell: newProblemID,
                  port: `${newProblemID}-in-port`,
                }, // 目标节点 ID 和连接桩 ID
                attrs: {
                  line: {
                    stroke: 'gray', // 设置线的颜色为灰色
                    strokeWidth: 2, // 设置线的宽度
                    // strokeDasharray: 5,
                    targetMarker: 'circle',
                  },
                },
              })
            }
            // 更新问题节点计数
            setAiProblemNodeCount((count) => count + generatedProblems.length)
            hide() // 关闭加载消息
          } catch (error) {
            hide()
            message.error(
              `Problem to problem generation failed:${error.message}`
            )
          } finally {
            setIsGenerating(false) // 在完成后重置生成标志
          }
        } else if (SelectedNodeType === 'solution') {
          // 如果选中的是解决方案节点
          setIsGenerating(true) // 设置正在生成的标志
          try {
            // s-p的处理逻辑
            let generatedProblems
            const solutionContent = nodeData // 假设节点数据中有内容字段
            if (modalSelectedTab === '1') {
              generatedProblems = await getSolutionToProblemImages({
                task: solutionContent,
                num: 3,
              })
            } else {
              generatedProblems = await getSolutionToProblemStimulus({
                task: solutionContent,
                num: 3,
              })
            }
            // 对每个生成的问题进行处理
            for (const [
              index,
              generatedProblem,
            ] of generatedProblems.entries()) {
              const position = selectedNode.getBBox()
              const newPosition = {
                // x: position.x + 500 + Math.random() * 500,
                // y: position.y,
                x: position.x + 500,
                y: position.y + index * 200,
              }
              const newProblemID = `AI-Problem-${
                aiProblemNodeCount + 1 + index
              }`
              // 为了加入problems数组而新建的数据对象
              const newProblemData = {
                id: newProblemID, // 唯一标识符
                name: 'problem', // 名称
                type: 'AIDesign_Problem', // 类型
                inPortsID: selectedNodeID,
                outPortsID: 'null',
              }
              // 提取问题文本
              const problemText = processText(generatedProblem.items[0].text)
              const problemImage = generatedProblem.items[0].image
              // 保存问题图像
              if (modalSelectedTab === '1') {
                // await saveImage({
                //   ImageName: `${userStore.user}_${newProblemID}`,
                //   Image: problemImage,
                // })
                metaStore.updateImages(
                  `${userStore.user}_${newProblemID}`,
                  problemImage
                )
              }
              console.log('AI问题节点ID', newProblemID)
              console.log('生成内容', problemText)
              // 更新 metaStore 中的 problems
              metaStore.updateProblems(newProblemData)
              metaStore.updateNodeData(newProblemID, problemText)
              // 更新选中节点的OutPortsID
              metaStore.updateLastOutPort(selectedNodeID, newProblemID)
              // 更新选中NodePair(s-p)
              metaStore.updateNodePair(
                newProblemID,
                selectedNodeID,
                's-p',
                'default',
                ''
              )
              // 添加 AIComponent1 节点
              addProblem({
                graph: graphStore.graph,
                problemID: newProblemID,
                component: (props) => (
                  <AIComponent1
                    {...props}
                    modalSelectedTab={modalSelectedTab}
                    content={problemText}
                    image={problemImage}
                    nodeID={newProblemID}
                  />
                ),
                position: [newPosition.x, newPosition.y],
              })
              // 连接边的代码
              graphStore.graph.addEdge({
                source: {
                  cell: newProblemData.inPortsID,
                  port: `${newProblemData.inPortsID}-out-port`,
                }, // 源节点和连接桩 ID
                target: {
                  cell: newProblemID,
                  port: `${newProblemID}-in-port`,
                }, // 目标节点 ID 和连接桩 ID
                attrs: {
                  line: {
                    stroke: 'gray', // 设置线的颜色为灰色
                    strokeWidth: 2, // 设置线的宽度
                    // strokeDasharray: 5,
                    targetMarker: 'circle',
                  },
                },
              })
            }
            hide() // 关闭消息
            // 更新问题节点计数
            setAiProblemNodeCount((count) => count + generatedProblems.length)
          } catch (error) {
            hide()
            message.error(
              `Solution to problem generation failed: ${error.message}`
            )
          } finally {
            setIsGenerating(false) // 在完成后重置生成标志
          }
        }
      } else {
        const hide = message.loading('Solution nodes are being generated...', 0) // 显示加载消息
        if (SelectedNodeType === 'problem') {
          // 如果选中的是问题节点
          setIsGenerating(true) // 设置正在生成的标志
          try {
            const problemContent = nodeData
            let generatedSolutions
            if (modalSelectedTab === '1') {
              generatedSolutions = await getProblemToSolutionImages({
                task: problemContent,
                num: 3,
              })
            } else {
              generatedSolutions = await getProblemToSolutionStimulus({
                task: problemContent,
                num: 3,
              })
            }
            // 对每个生成的问方案进行处理
            for (const [
              index,
              generatedSolution,
            ] of generatedSolutions.entries()) {
              const position = selectedNode.getBBox()
              const newPosition = {
                // x: position.x + 500 + Math.random() * 500,
                // y: position.y,
                x: position.x + 500,
                y: position.y + index * 200,
              }
              const newSolutionID = `AI-Solution-${
                aiSolutionNodeCount + 1 + index
              }`
              // 为了加入solutions数组而新建的数据对象
              const newSolutionData = {
                id: newSolutionID, // 唯一标识符
                name: 'solution', // 名称
                type: 'AIDesign_Solution', // 类型
                inPortsID: selectedNodeID,
                outPortsID: 'null',
              }
              // 提取方案文本
              const solutionText = processText(generatedSolution.items[0].text)
              const solutionImage = generatedSolution.items[0].image
              // 保存方案图像
              if (modalSelectedTab === '1') {
                // await saveImage({
                //   ImageName: `${userStore.user}_${newSolutionID}`,
                //   Image: solutionImage,
                // })
                metaStore.updateImages(
                  `${userStore.user}_${newSolutionID}`,
                  solutionImage
                )
              }
              console.log('AI方案节点ID', newSolutionID)
              console.log('生成内容', solutionText)
              // 更新 metaStore 中的 solutions
              metaStore.updateSolutions(newSolutionData)
              metaStore.updateNodeData(newSolutionID, solutionText)
              // 更新选中节点的OutPortsID
              metaStore.updateLastOutPort(selectedNodeID, newSolutionID)
              // 更新选中NodePair(p-s)
              metaStore.updateNodePair(
                selectedNodeID,
                newSolutionID,
                'p-s',
                'default',
                ''
              )
              // 添加 AIComponent2 节点
              addSolution({
                graph: graphStore.graph,
                solutionID: newSolutionID,
                component: (props) => (
                  <AIComponent2
                    {...props}
                    modalSelectedTab={modalSelectedTab}
                    content={solutionText}
                    image={solutionImage}
                    nodeID={newSolutionID}
                  />
                ),
                position: [newPosition.x, newPosition.y],
              })
              // 连接边的代码
              graphStore.graph.addEdge({
                source: {
                  cell: newSolutionData.inPortsID,
                  port: `${newSolutionData.inPortsID}-out-port`,
                }, // 源节点和连接桩 ID
                target: {
                  cell: newSolutionID,
                  port: `${newSolutionID}-in-port`,
                }, // 目标节点 ID 和连接桩 ID
                attrs: {
                  line: {
                    stroke: 'gray', // 设置线的颜色为灰色
                    strokeWidth: 2, // 设置线的宽度
                    // strokeDasharray: 5,
                    targetMarker: 'circle',
                  },
                },
              })
            }
            hide()
            // 更新问题节点计数
            setAiSolutionNodeCount((count) => count + generatedSolutions.length)
          } catch (error) {
            hide()
            message.error(`Solution generation failed: ${error.message}`)
          } finally {
            setIsGenerating(false) // 在完成后重置生成标志
          }
        } else if (SelectedNodeType === 'solution') {
          // 如果选中的是解决方案节点
          setIsGenerating(true) // 设置正在生成的标志
          try {
            const solutionContent = nodeData // 假设节点数据中有内容字段
            let generatedSolutions
            if (modalSelectedTab === '1') {
              generatedSolutions = await getSolutionToSolutionImages({
                task: solutionContent,
                num: 3,
              })
            } else {
              generatedSolutions = await getSolutionToSolutionStimulus({
                task: solutionContent,
                num: 3,
              })
            }
            // 对每个生成的问方案进行处理
            for (const [
              index,
              generatedSolution,
            ] of generatedSolutions.entries()) {
              const position = selectedNode.getBBox()
              const newPosition = {
                // x: position.x + 500 + Math.random() * 500,
                // y: position.y,
                x: position.x + 500,
                y: position.y + index * 200,
              }
              const newSolutionID = `AI-Solution-${
                aiSolutionNodeCount + 1 + index
              }`
              // 为了加入solutions数组而新建的数据对象
              const newSolutionData = {
                id: newSolutionID, // 唯一标识符
                name: 'solution', // 名称
                type: 'AIDesign_Solution', // 类型
                inPortsID: selectedNodeID,
                outPortsID: 'null',
              }
              // 提取方案文本
              const solutionText = processText(generatedSolution.items[0].text)
              const solutionImage = generatedSolution.items[0].image
              // 保存方案图像
              if (modalSelectedTab === '1') {
                // await saveImage({
                //   ImageName: `${userStore.user}_${newSolutionID}`,
                //   Image: solutionImage,
                // })
                metaStore.updateImages(
                  `${userStore.user}_${newSolutionID}`,
                  solutionImage
                )
              }
              console.log('AI方案节点ID', newSolutionID)
              console.log('生成内容', solutionText)
              // 更新 metaStore 中的 solutions
              metaStore.updateSolutions(newSolutionData)
              metaStore.updateNodeData(newSolutionID, solutionText)
              // 更新选中节点的OutPortsID
              metaStore.updateLastOutPort(selectedNodeID, newSolutionID)
              // 添加 AIComponent2 节点
              addSolution({
                graph: graphStore.graph,
                solutionID: newSolutionID,
                component: (props) => (
                  <AIComponent2
                    {...props}
                    modalSelectedTab={modalSelectedTab}
                    content={solutionText}
                    image={solutionImage}
                    nodeID={newSolutionID}
                  />
                ),
                position: [newPosition.x, newPosition.y],
              })
              // 连接边的代码
              graphStore.graph.addEdge({
                source: {
                  cell: newSolutionData.inPortsID,
                  port: `${newSolutionData.inPortsID}-out-port`,
                }, // 源节点和连接桩 ID
                target: {
                  cell: newSolutionID,
                  port: `${newSolutionID}-in-port`,
                }, // 目标节点 ID 和连接桩 ID
                attrs: {
                  line: {
                    stroke: 'gray', // 设置线的颜色为灰色
                    strokeWidth: 2, // 设置线的宽度
                    // strokeDasharray: 5,
                    targetMarker: 'circle',
                  },
                },
              })
            }
            hide()
            // 更新问题节点计数
            setAiSolutionNodeCount((count) => count + generatedSolutions.length)
          } catch (error) {
            hide()
            message.error(`Solution generation failed: ${error.message}`)
          } finally {
            setIsGenerating(false) // 在完成后重置生成标志
          }
        }
      }
    } else {
      message.error('Please select a node first.')
    }
  }
  const changeLine = (problemID, solutionID, type, color, text) => {
    const problem = metaStore.problems.find((p) => p.ProblemID === problemID)
    const solution = metaStore.solutions.find(
      (s) => s.SolutionID === solutionID
    )
    if (!problem || !solution) {
      console.log(`Problem or solution with given ID not found.`)
      return
    }

    let sourceCellid, targetCellid

    // 根据type判断连线方向
    if (type === 'p-s') {
      // problem是输出节点，solution是输入节点
      sourceCellid = problemID
      targetCellid = solutionID
    } else if (type === 's-p') {
      // solution是输出节点，problem是输入节点
      sourceCellid = solutionID
      targetCellid = problemID
    } else {
      console.log(`Invalid node pair type: ${type}`)
      return
    }
    const edge = graphStore.findEdge(sourceCellid, targetCellid)

    if (edge) {
      edge.attr('line/stroke', color)
      edge.setLabels(text)
    } else {
      console.log(`Edge not found between ${problemID} and ${solutionID}`)
    }
  }
  // 评估函数
  const handleEvaluateClick = async () => {
    const hide = message.loading('Ongoing evaluation...', 0) // 显示加载消息
    if (isGenerating) {
      message.warning('Node is being generated, please wait...')
      return
    }
    if (isEvaluating) {
      message.warning('Evaluation underway, please wait...')
      return
    }
    setIsEvaluating(true)
    try {
      const result = await Evaluate({
        problems: metaStore.problems,
        solutions: metaStore.solutions,
      })
      if (result && result.evaluate) {
        // 创建一个以 ProblemID 和 SolutionID 为键的映射
        const resultMap = new Map(
          result.evaluate.map((pair) => [
            pair.ProblemID + pair.SolutionID,
            pair.Reason,
          ])
        )
        // console.log(resultMap)

        // 遍历 nodePairs 并更新状态
        metaStore.nodepairs.forEach((pair) => {
          const key = pair.ProblemID + pair.SolutionID
          if (resultMap.has(key)) {
            const Reason = resultMap.get(key) as string
            // 如果在评估结果中找到了匹配项
            metaStore.updateNodePair(
              pair.ProblemID,
              pair.SolutionID,
              pair.Type,
              'match',
              Reason
            )
            changeLine(
              pair.ProblemID,
              pair.SolutionID,
              pair.Type,
              '#00D7D7',
              Reason
            )
            console.log('match', Reason)
          } else {
            // 如果在评估结果中未找到匹配项
            metaStore.updateNodePair(
              pair.ProblemID,
              pair.SolutionID,
              pair.Type,
              'dismatch',
              '不匹配'
            )
            changeLine(
              pair.ProblemID,
              pair.SolutionID,
              pair.Type,
              '#FF727A',
              '不匹配'
            )
          }
        })

        // 处理后端返回但前端不存在的节点对
        result.evaluate.forEach((evalPair) => {
          const key = evalPair.ProblemID + evalPair.SolutionID
          if (
            !metaStore.nodepairs.some(
              (pair) =>
                pair.ProblemID === evalPair.ProblemID &&
                pair.SolutionID === evalPair.SolutionID
            )
          ) {
            metaStore.updateNodePair(
              evalPair.ProblemID,
              evalPair.SolutionID,
              'p-s',
              'new',
              evalPair.Reason
            )
            graphStore.graph.addEdge({
              source: {
                cell: evalPair.ProblemID,
                port: `${evalPair.ProblemID}-out-port`,
              }, // 源节点和连接桩 ID
              target: {
                cell: evalPair.SolutionID,
                port: `${evalPair.SolutionID}-in-port`,
              }, // 目标节点 ID 和连接桩 ID
              attrs: {
                line: {
                  stroke: '#FF8900', // 设置线的颜色
                  strokeWidth: 2, // 设置线的宽度
                  strokeDasharray: 5,
                  targetMarker: 'circle',
                },
              },
              labels: [
                {
                  attrs: {
                    text: {
                      text: evalPair.Reason,
                    },
                  },
                },
              ],
            })
          }
        })
      }
      setEvaluationResult(result)
      hide()
    } catch (error) {
      // 修改：显示具体的错误信息
      hide()
      message.error(`Well, the evaluation seems to have failed`)
      console.log(error.message)
    } finally {
      setIsEvaluating(false)
    }
  }
  // 用户信息填写
  const handleClickInputUsernameButton = async () => {
    if (currentUsername && currentUsername.length > 0) {
      // 更新用户名
      userStore.updateUsername(currentUsername)
      // 获取用户信息
      const userInfo = await start({ username: currentUsername })
      // 更新用户信息
      if (userInfo) {
        userStore.loadUserInfo(userInfo)
      }
      console.log('新建用户成功，用户名为：', userStore.user)
    }
  }
  const saveHandler = async () => {
    // if (hasUnsavedFinal) {
    //   message.error('最终编辑未保存！')
    //   return
    // }
    const hide = message.loading('In the process of saving...', 0) // 显示加载消息
    const data = {
      problemSchemes: metaStore.problems,
      solutionSchemes: metaStore.solutions,
      nodePairs: metaStore.nodepairs,
      finalProblem: metaStore.finalproblem,
      finalSolution: metaStore.finalsolution,
    }
    const username = userStore.user
    console.log('username=', username)
    try {
      // 调用 save 函数发送数据到后端
      await save({ username, data })
      console.log('文本数据保存成功')
      for (const image of metaStore.images) {
        await saveImage({
          ImageName: image.ImageName,
          Image: image.Image,
        })
      }
      console.log('所有图片已保存')
      hide()
    } catch (error) {
      hide()
      message.error(`Data saving failed!`)
      console.error('数据保存失败:', error)
    }
  }
  // demo用，初始化第一个方法----修改为初始化问题节点
  const initFirstMethod = async () => {
    const newProblemData = {
      id: 'My-Problem', // 唯一标识符
      name: 'problem', // 名称
      type: 'MyDesign_Problem', // 类型
      inPortsID: 'null',
      outPortsID: 'null',
    }
    // addProblem：在画布上添加节点
    console.log('firstnode_id:', newProblemData.id)
    // 更新 metaStore 中的 problems
    metaStore.updateProblems(newProblemData)
    addProblem({
      graph: graphStore.graph,
      problemID: newProblemData.id,
      component: ({ graph, node }) => (
        <MyComponent1
          graph={graph}
          node={node}
          nodeID={newProblemData.id}
          onSaved={() => setHasUnsavedNodes(false)}
        />
      ),
      position: [500, 150],
    })
  }

  return (
    <div {...styleClass(['main-graph-wrapper'])}>
      <Header
        Tab={
          <TabBar
            leftbutton="Design"
            rightbutton="Evaluate"
            onTabChange={handleTabChange} // 添加此回调来处理标签更改
          />
        }
        button1={
          <AntDButton
            {...styleClass(['float-button-1'])}
            icon={<QuestionCircleOutlined rev={undefined} />}
            type="default"
            onClick={showGuidebook} // 添加点击事件处理
          />
        }
        button2={
          <AntDButton
            {...styleClass(['float-button-2'])}
            icon={<BorderInnerOutlined rev={undefined} />}
            type="default"
            onClick={() => {
              graphStore.graph.scale(1, 1)
              graphStore.graph.centerContent()
            }}
          />
        }
        userText={
          <Input
            value={currentUsername}
            onChange={(e) => setCurrentUsername(e.target.value)}
            placeholder="username"
            bordered={false}
            style={{
              height: '28px',
              resize: 'none',
              width: '150px',
              backgroundColor: '#F4F5F8',
            }}
          />
        }
        userConfirm={
          <AntDButton
            style={{
              borderRadius: '6px',
            }}
            // size={'small'}
            type="dashed"
            onClick={handleClickInputUsernameButton}
          >
            start
          </AntDButton>
        }
        saveButton={
          <AntDButton
            {...styleClass(['float-button-1'])}
            icon={<SaveOutlined rev={undefined} />}
            type="dashed"
            onClick={saveHandler}
          />
        }
      />

      {contextHolder1}
      {contextHolder2}
      <div ref={refContainer} {...styleClass([''])}></div>
      <div style={{ display: selectedTab === 'Design' ? 'block' : 'none' }}>
        {' '}
        <EditLayout
          icon={<SvgIcon icon={OpenAI} />}
          name={'AI Designer'}
          color="#16A199"
          hoverColor="#018E8E"
        >
          <div {...styleClass(['text-content'])}>
            {
              // '添加新节点前请先选择节点!\nSelect a node before adding a new node'
              'Select a node before adding a new node'
            }
          </div>
          <div {...styleClass(['text-title'])}>{'Mode'}</div>
          <Segmented
            style={{
              fontWeight: 'bold',
              fontSize: '16px',
            }}
            // size="large"
            block={true}
            options={modalOptions}
            value={modalSelectedTab}
            onChange={(key) => {
              if (typeof key === 'string') {
                setModalSelectedTab(key)
              }
            }}
          />
          <div {...styleClass(['text-title'])}>{'Type of node'}</div>
          <Segmented
            style={{
              fontWeight: 'bold',
              fontSize: '16px',
            }}
            // size="large"
            block={true}
            options={nodeOptions}
            value={aiNodeSelectedTab}
            onChange={(key) => {
              if (typeof key === 'string') {
                setAiNodeSelectedTab(key)
              }
            }}
          />
          <AntDButton
            onClick={handleAiGenerateClick}
            style={{ fontWeight: 'bold', fontSize: '20px' }}
            shape="round"
            // size="large"
            block={true}
            type="primary"
          >
            {'Generate'}
          </AntDButton>
        </EditLayout>
        <EditLayout
          icon={<SvgIcon icon={User} />}
          name={'My Design'}
          color="#16A199"
          hoverColor="#018E8E"
        >
          <div {...styleClass(['text-content'])}>
            {
              // '添加新节点前请先选择节点!\nSelect a node before adding a new node'
              'Select a node before adding a new node'
            }
          </div>
          <div {...styleClass(['text-title'])}>{'Type of node'}</div>
          <Segmented
            style={{
              fontWeight: 'bold',
              fontSize: '16px',
            }}
            // size="large"
            block={true}
            options={nodeOptions}
            value={myNodeSelectedTab}
            onChange={(key) => {
              if (typeof key === 'string') {
                setMyNodeSelectedTab(key)
              }
            }}
          />
          <AntDButton
            onClick={handleMyGenerateClick}
            style={{
              fontWeight: 'bold',
              fontSize: '20px',
            }}
            shape="round"
            // size="large"
            block={true}
            type="primary"
          >
            {'Add Node'}
          </AntDButton>
        </EditLayout>
      </div>
      <div style={{ display: selectedTab === 'Evaluate' ? 'block' : 'none' }}>
        <EditLayout
          icon={<SvgIcon icon={OpenAI} />}
          name={'AI Designer'}
          color="#EF5A5A"
          hoverColor="#DB5A69"
        >
          <div {...styleClass(['text-content'])}>
            {'Here are some instructions！'}
          </div>
          <ImageContent
            image="https://s3.bmp.ovh/imgs/2024/01/12/e2c4037c361a2fbf.png"
            text=""
          />
          <AntDButton
            style={{
              fontWeight: 'bold',
              fontSize: '20px',
            }}
            shape="round"
            // size="large"
            type="primary"
            block={false}
            onClick={handleEvaluateClick}
          >
            {'Start Evaluation'}
          </AntDButton>
        </EditLayout>
        <FinalProblem onSaved={() => setHasUnsavedFinal(false)} />
        <FinalSolution onSaved={() => setHasUnsavedFinal(false)} />
      </div>
    </div>
  )
})
