import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react'
import { Graph, Node } from '@antv/x6'
import { useColorVar, useStyles } from '@/hooks/styles'
import { Input, Button } from 'antd'
import styles from '@/components/MainGraph/NewComponent.module.scss'
import { MethodLayout } from '@/components/MethodLayout/MethodLayout'
import { SvgIcon } from '@/components/icons'
import { OpenAI } from '@/components/icons/OpenAI'
import { Show } from '@/components/icons/Show'
import { Plogo } from '@/components/icons/Plogo'
import { Slogo } from '@/components/icons/Slogo'
// import { ProblemLeft } from '@/components/icons/ProblemLeft'
// import { ProblemRight } from '@/components/icons/ProblemRight'
// import { SolutionLeft } from '@/components/icons/SolutionLeft'
// import { SolutionRight } from '@/components/icons/SolutionRight'
import { User } from '@/components/icons/User'
import { Unreveal } from '@/components/icons/Unreveal'
import { ImageContent } from '@/components/MainGraph/ImageContent'
import { useAppStore, useGraphStore, useMetaStore } from '@/hooks'
import { observer } from 'mobx-react'
import { AppContext, RootContext } from '@/App.context'
import { StaticLayout } from '@/components/StaticLayout/StaticLayout'
import { PAI } from '@/components/icons/PAI'
import { SAI } from '@/components/icons/SAI'

// 通过addProblem的方法添加到MainGraph
export const MyComponent1 = ({
  graph,
  node,
  nodeID,
  onSaved,
}: {
  graph: Graph
  node: Node
  nodeID: string
  onSaved: any
}) => {
  return (
    <MethodLayout
      name={nodeID}
      icon={<SvgIcon icon={User} />}
      logo={<SvgIcon icon={Plogo} />}
      reveal={<SvgIcon icon={Show} />}
      unreveal={<SvgIcon icon={Unreveal} />}
      // leftport={<SvgIcon icon={ProblemLeft} />}
      // rightport={<SvgIcon icon={ProblemRight} />}
      // onToggleVisibility={handleToggleVisibility}
      hoverBorderColor={'#047575'}
      hoverColor={'#047575'}
      color={'#16A199'}
      node={node}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '25px',
        }}
      >
        {/* <StaticLayout> */}
        <MyInput nodeID={nodeID} onSaved={onSaved} />
        {/* </StaticLayout> */}
      </div>
    </MethodLayout>
  )
}
// 通过addSolution方法添加到MainGraph
export const MyComponent2 = ({
  graph,
  node,
  nodeID,
  onSaved,
}: {
  graph: Graph
  node: Node
  nodeID: string
  onSaved: any
}) => {
  // const handleToggleVisibility = (isVisible: boolean) => {
  //   const newSize = isVisible
  //     ? { width: 350, height: 350 }
  //     : { width: 350, height: 45 }
  //   node.setSize(newSize.width, newSize.height)
  // }
  return (
    <MethodLayout
      name={nodeID}
      icon={<SvgIcon icon={User} />}
      logo={<SvgIcon icon={Slogo} />}
      reveal={<SvgIcon icon={Show} />}
      unreveal={<SvgIcon icon={Unreveal} />}
      // leftport={<SvgIcon icon={SolutionLeft} />}
      // rightport={<SvgIcon icon={SolutionRight} />}
      // onToggleVisibility={handleToggleVisibility}
      hoverBorderColor={'#DB5A69'}
      hoverColor={'#DB5A69'}
      color={'#EF5A5A'}
      node={node}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '25px',
        }}
      >
        {/* <StaticLayout> */}
        <MyInput nodeID={nodeID} onSaved={onSaved} />
        {/* </StaticLayout> */}
      </div>
    </MethodLayout>
  )
}
interface IMyIput {
  nodeID: string
}
export const MyInput: FC<IMyIput & { onSaved: () => void }> = observer(
  ({ nodeID, onSaved }) => {
    const [inputValue, setInputValue] = useState('')
    const styleClass = useStyles(styles)
    const metaStore = useMetaStore() // 引入 metaStore

    const handleInputChange = (event) => {
      const newValue = event.target.value
      setInputValue(newValue)
    }

    // const handleSave = () => {
    //   // 使用 inputValue 更新 metaStore
    //   metaStore.updateNodeData(nodeID, inputValue)
    //   console.log('nodeID:', nodeID)
    //   console.log('Saved content:', inputValue)
    //   onSaved() // 调用 onSaved 回调
    // }
    useEffect(() => {
      if (inputValue) {
        // 使用 inputValue 更新 metaStore
        metaStore.updateNodeData(nodeID, inputValue)
        console.log('nodeID:', nodeID)
        console.log('Saved content:', inputValue)
        onSaved() // 调用 onSaved 回调
      }
    }, [inputValue, metaStore, nodeID, onSaved]) // 当inputValue变化时，自动执行保存逻辑

    return (
      <div {...styleClass(['text-layout'])}>
        <StaticLayout>
          {' '}
          <Input.TextArea
            placeholder={'type here......'}
            maxLength={800}
            showCount={true}
            value={inputValue}
            onChange={handleInputChange}
            autoSize={{ minRows: 4, maxRows: 8 }}
          ></Input.TextArea>
        </StaticLayout>
        {/* <Button
          onClick={handleSave}
          type="default"
          style={{ fontWeight: 'bold' }}
        >
          Save
        </Button> */}
      </div>
    )
  }
)

interface AIComponentProps {
  node: Node
  graph: Graph
  modalSelectedTab: string
  content: string
  image: string
  nodeID: string
}
export const AIComponent1: FC<AIComponentProps> = ({
  node,
  graph,
  modalSelectedTab,
  content,
  image,
  nodeID,
}) => {
  return (
    <MethodLayout
      name={nodeID}
      icon={<SvgIcon icon={OpenAI} />}
      logo={<SvgIcon icon={PAI} />}
      reveal={<SvgIcon icon={Show} />}
      unreveal={<SvgIcon icon={Unreveal} />}
      // leftport={<SvgIcon icon={ProblemLeft} />}
      // rightport={<SvgIcon icon={ProblemRight} />}
      // onToggleVisibility={handleToggleVisibility}
      hoverBorderColor={'#047575'}
      hoverColor={'#047575'}
      color={'#16A199'}
      node={node}
    >
      {modalSelectedTab === '1' ? (
        <ImageContent image={image} text={content} />
      ) : (
        <AiInput text={content} />
      )}
    </MethodLayout>
  )
}
export const AIComponent2: FC<AIComponentProps> = ({
  node,
  graph,
  modalSelectedTab,
  content,
  image,
  nodeID,
}) => {
  return (
    <MethodLayout
      name={nodeID}
      icon={<SvgIcon icon={OpenAI} />}
      logo={<SvgIcon icon={SAI} />}
      reveal={<SvgIcon icon={Show} />}
      unreveal={<SvgIcon icon={Unreveal} />}
      // leftport={<SvgIcon icon={SolutionLeft} />}
      // rightport={<SvgIcon icon={SolutionRight} />}
      // onToggleVisibility={handleToggleVisibility}
      hoverBorderColor={'#DB5A69'}
      hoverColor={'#DB5A69'}
      color={'#EF5A5A'}
      node={node}
    >
      {modalSelectedTab === '1' ? (
        <ImageContent image={image} text={content} />
      ) : (
        <AiInput text={content} />
      )}
    </MethodLayout>
  )
}

interface AiInputProps {
  text: string
}

export const AiInput: React.FC<AiInputProps> = ({ text }) => {
  const [inputValue, setInputValue] = useState(text)
  const styleClass = useStyles(styles)
  useEffect(() => {
    let output = ''
    let index = 0
    let timer = null
    function typeWriter() {
      // 检查索引是否超出文本长度
      if (index < text.length) {
        // 逐字截取文本并显示
        const char = text.charAt(index)
        output += char
        setInputValue(output)
        index++

        // 通过递归调用自身设置下一个字符的输出延迟时间
        timer = setTimeout(typeWriter, 15) // 修改这个值可以控制打字速度
      }
    }
    typeWriter()
  }, [])

  // 当输入变化时，更新状态并调用回调函数
  const handleInputChange = (event) => {
    const newValue = event.target.value
    setInputValue(newValue)
  }

  return (
    <div {...styleClass(['text-layout'])}>
      <StaticLayout>
        <Input.TextArea
          maxLength={800}
          showCount={true}
          value={inputValue}
          // onChange={(event) => setInputValue(event.target.value)}
          onChange={handleInputChange}
          autoSize={{ minRows: 4, maxRows: 8 }}
        >
          {text}
        </Input.TextArea>
      </StaticLayout>
    </div>
  )
}
