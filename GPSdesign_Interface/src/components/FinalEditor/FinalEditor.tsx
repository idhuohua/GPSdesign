import React, { Children, FC, ReactNode, useState, useRef } from 'react'
import styles from './FinalEditor.module.scss'
import { ResizeBox } from '@arco-design/web-react'
import ReactDragResize from 'react-drag-resize-growth'
import { useStyles } from '@/hooks/styles'
import { motion } from 'framer-motion'
import { motionEasing } from '@/config'
import { observer } from 'mobx-react'
import { Input, Button } from 'antd'
import { ConfigProvider, theme } from 'antd'
import { SvgIcon } from '@/components/icons'
import { Plogo } from '@/components/icons/Plogo'
import { Slogo } from '@/components/icons/Slogo'
import { EditableTagGroup } from '@/components/universal/Tag/Tag'
import { useMetaStore } from '@/hooks'

interface IFinalEditor {
  children?: any
  name?: ReactNode
  icon?: ReactNode
  color?: string
  hoverColor?: string
}

export const FinalEditor: FC<IFinalEditor> = observer(
  ({ children, name, icon, color, hoverColor }) => {
    const styleClass = useStyles(styles)
    return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: color,
            colorPrimaryHover: hoverColor,
          },
          algorithm: theme.defaultAlgorithm,
        }}
      >
        <ReactDragResize
          {...styleClass([], { zIndex: 999, display: 'flex' })}
          isResizable={false}
          isDraggable={true}
          // drag锚点使用CSS选择器
          dragHandle=".dragTrigger"
          w={'500'}
          h={'auto'}
          x={'40'} // 初始位置
          y={'90'}
          isActive={false}
        >
          <motion.div
            {...styleClass(['motion-wrapper'])}
            initial={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            whileHover={{
              boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)',
            }}
            transition={{ ...motionEasing, duration: 0.2 }}
          >
            <div {...styleClass(['header'], {}, { className: 'dragTrigger' })}>
              <motion.div
                {...styleClass(
                  ['header-stick'],
                  {},
                  { className: 'dragTrigger' }
                )}
                initial={{ width: 170 }}
                whileHover={{ width: 210 }}
                transition={{ ...motionEasing, duration: 0.25 }}
              ></motion.div>
            </div>
            <motion.div {...styleClass(['header-card'])}>
              <div {...styleClass(['header-card-icon'])}>{icon}</div>
              <div {...styleClass(['header-card-text'])}>{name}</div>
            </motion.div>
            <div {...styleClass(['content'])}>{children}</div>
          </motion.div>
        </ReactDragResize>
      </ConfigProvider>
    )
  }
)

export const FinalInput: FC<{ onSaved: () => void; type: string }> = observer(
  ({ onSaved, type }) => {
    const [inputValue, setInputValue] = useState('')
    const styleClass = useStyles(styles)
    const metaStore = useMetaStore() // 引入 metaStore

    const handleInputChange = (event) => {
      const newValue = event.target.value
      setInputValue(newValue)
    }

    const handleSave = () => {
      // 使用 inputValue 更新 metaStore
      metaStore.updateFinalText(type, inputValue)
      onSaved() // 调用 onSaved 回调
    }

    return (
      <div {...styleClass(['text'])}>
        {' '}
        <Input.TextArea
          placeholder={'type here......'}
          maxLength={800}
          showCount={true}
          value={inputValue}
          onChange={handleInputChange}
          autoSize={{ minRows: 4, maxRows: 8 }}
        ></Input.TextArea>
        <Button
          type="primary"
          style={{
            width: '20%',
            fontWeight: 'bold',
            marginTop: '20px',
            alignSelf: 'end',
          }}
          size="large"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    )
  }
)
export const FinalProblem = ({ onSaved }: { onSaved: any }) => {
  const styleClass = useStyles(styles)
  const metaStore = useMetaStore()
  const handleTagsChanged = (tags) => {
    metaStore.updateFinalTags('problem', tags) // 更新标签
  }
  return (
    <FinalEditor
      icon={<SvgIcon icon={Plogo} />}
      name={'Final design problem'}
      color="#16A199"
      hoverColor="#018E8E"
    >
      <div {...styleClass(['text-content'])}>
        {
          // '写下与最终设计问题相关的设计问题。\nWrite down design problems related to the final design problem.'
          'Write down design problems related to the final design problem.'
        }
      </div>
      <EditableTagGroup onTagsChanged={handleTagsChanged} />
      <div {...styleClass(['text-content'])}>
        {/* {'请输入最终设计问题。\nPlease enter the final design problem.'} */}
        {'Please enter the final design problem.'}
      </div>
      <FinalInput onSaved={onSaved} type="problem" />
    </FinalEditor>
  )
}

export const FinalSolution = ({ onSaved }: { onSaved: any }) => {
  const styleClass = useStyles(styles)
  const metaStore = useMetaStore()
  const handleTagsChanged = (tags) => {
    metaStore.updateFinalTags('solution', tags) // 更新标签
  }
  return (
    <FinalEditor
      icon={<SvgIcon icon={Slogo} />}
      name={'Final design solution'}
      color="#EF5A5A"
      hoverColor="#DB5A69"
    >
      <div {...styleClass(['text-content'])}>
        {
          // '写下与最终方案相关的设计方案。\nWrite down design solutions related to the final design solution.'
          'Write down design solutions related to the final design solution.'
        }
      </div>

      <EditableTagGroup onTagsChanged={handleTagsChanged} />
      <div {...styleClass(['text-content'])}>
        {/* {'请输入最终设计方案。\nPlease enter the final design solution.'} */}
        {'Please enter the final design solution.'}
      </div>
      <FinalInput onSaved={onSaved} type="solution" />
    </FinalEditor>
  )
}
