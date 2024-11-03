import { ComponentType } from 'react'
import { Graph, Markup, Node } from '@antv/x6'
import { register } from '@antv/x6-react-shape'
import AppStore from '@/store/app'
// import { getFCSize } from '@/hooks'
import { MethodPortPosition } from '@/components/MainGraph/GraphOptions'
import { Lang } from '@/config'
import { Tabs } from 'antd'
import PropTypes from 'prop-types'
import MetaStore from '@/store/metaStore'
import React from 'react'

export const ModalTabSwitch = ({ onTabChange }) => {
  return (
    <Tabs defaultActiveKey="1" onChange={onTabChange}>
      <Tabs.TabPane tab="图像" key="1" />
      <Tabs.TabPane tab="文本" key="2" />
    </Tabs>
  )
}
// 添加 PropTypes 验证
ModalTabSwitch.propTypes = {
  onTabChange: PropTypes.func.isRequired, // 指定 onTabChange 是一个函数，并且是必需的
}

export const NodeTabSwitch = ({ onTabChange }) => {
  return (
    <Tabs defaultActiveKey="1" onChange={onTabChange}>
      <Tabs.TabPane tab="问题" key="1" />
      <Tabs.TabPane tab="方案" key="2" />
    </Tabs>
  )
}
// 添加 PropTypes 验证
NodeTabSwitch.propTypes = {
  onTabChange: PropTypes.func.isRequired, // 指定 onTabChange 是一个函数，并且是必需的
}

// 添加问题节点方法
export const addProblem = (inputData: {
  graph: Graph // 目标画布
  problemID: string
  component: ComponentType<{
    graph: Graph
    node: Node
  }>
  position: [number, number] // 添加该组件位于画布的位置
}) => {
  const { graph, problemID, component, position } = inputData
  register({
    shape: problemID,
    effect: ['data'],
    component: component,
  })
  console.log('注册成功')
  graph.addNode({
    x: position[0],
    y: position[1],
    id: problemID,
    shape: problemID,
    portMarkup: [Markup.getForeignObjectMarkup()],
    ports: {
      groups: {
        in: {
          attrs: {
            fo: {
              width: 10,
              height: 64,
              x: 0,
              y: -32,
              magnet: 'true',
            },
          },
          zIndex: 1,
          position: {
            name: 'left',
          },
        },
        out: {
          attrs: {
            fo: {
              width: 10,
              height: 64,
              x: -10,
              y: -32,
              magnet: 'true',
            },
          },
          zIndex: 1,
          position: {
            name: 'right',
          },
        },
      },
      items: [
        { id: `${problemID}-in-port`, group: 'in' },
        { id: `${problemID}-out-port`, group: 'out' },
      ],
    },
  })
}
// 添加方案节点方法
export const addSolution = (inputData: {
  graph: Graph // 目标画布
  solutionID: string
  component: ComponentType<{
    node: Node
    graph: Graph
  }>
  position: [number, number] // 添加该组件位于画布的位置
}) => {
  const { graph, solutionID, component, position } = inputData
  register({
    shape: solutionID,
    effect: ['data'],
    component: component,
  })

  graph.addNode({
    x: position ? position[0] : 120, // 待确认
    y: position ? position[1] : 50, // 待确认
    id: solutionID,
    shape: solutionID,
    portMarkup: [Markup.getForeignObjectMarkup()],
    ports: {
      groups: {
        in: {
          attrs: {
            fo: {
              width: 10,
              height: 64,
              x: 0,
              y: -32,
              magnet: 'true',
            },
          },
          zIndex: 1,
          position: {
            name: 'left',
          },
        },
        out: {
          attrs: {
            fo: {
              width: 10,
              height: 64,
              x: -10,
              y: -32,
              magnet: 'true',
            },
          },
          zIndex: 1,
          position: {
            name: 'right',
          },
        },
      },
      items: [
        { id: `${solutionID}-in-port`, group: 'in' },
        { id: `${solutionID}-out-port`, group: 'out' },
      ],
    },
  })
}

// 语言切换
export const switchLanguage = (
  appStore: AppStore,
  graph: Graph,
  newLang: 'English' | '中文'
) => {
  appStore.setLanguage(newLang === 'English' ? Lang.en : Lang.zh)
}
