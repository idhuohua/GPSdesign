import React, { Children, FC, ReactNode } from 'react'
import styles from './EditLayout.module.scss'
import { ResizeBox } from '@arco-design/web-react'
import ReactDragResize from 'react-drag-resize-growth'
import { useStyles } from '@/hooks/styles'
import { motion } from 'framer-motion'
import { motionEasing } from '@/config'
import { ConfigProvider, theme } from 'antd'
import { observer } from 'mobx-react'
// import { useScrollToBottom } from '@/components/Planner/utils/hooks'

interface IEditLayout {
  children?: any
  icon?: ReactNode
  name?: ReactNode
  color?: string
  hoverColor?: string
}

export const EditLayout: FC<IEditLayout> = observer(
  ({ children, icon, name, color, hoverColor }) => {
    const styleClass = useStyles(styles)
    // const chatStore = useChatStore()
    // const { scrollRef, scrollDomToBottom } = useScrollToBottom()

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
          w={'300'}
          h={'auto'}
          x={'40'} // 初始位置
          y={'90'}
          isActive={false}
        >
          {' '}
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
