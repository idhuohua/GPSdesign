import {
  CSSProperties,
  FC,
  ReactNode,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react'
import lang from './MethodLayout.i18n.json'
import styles from './MethodLayout.module.scss'
import { useLang } from '@/hooks/i18n'
import { useColorVar, useStyles } from '@/hooks/styles'
import { motion } from 'framer-motion'
import { motionEasing } from '@/config'
import { MethodPortPosition } from '@/components/MainGraph/GraphOptions'
import { Button } from '@/components/universal/Button/Button'
import { ConfigProvider, theme } from 'antd'
import { debounce } from 'lodash'
import { Graph, Node } from '@antv/x6'

interface IMethodLayout {
  input?: any
  output?: any
  icon?: ReactNode
  name?: string
  children?: ReactNode
  style?: CSSProperties
  logo?: ReactNode
  reveal?: ReactNode
  leftport?: ReactNode
  rightport?: ReactNode
  unreveal?: ReactNode
  onToggleVisibility?: any
  hoverBorderColor?: string
  hoverColor?: string
  color?: string
  node: Node
}

export const MethodLayout: FC<IMethodLayout> = ({
  icon,
  logo,
  reveal,
  unreveal,
  name = '',
  children,
  leftport,
  rightport,
  style = {},
  onToggleVisibility, // 新增回调prop
  hoverBorderColor,
  hoverColor,
  color,
  node,
}) => {
  const { t } = useLang(lang, 'MethodLayout')
  const c = useColorVar()
  const styleClass = useStyles(styles)
  const sizeRef = useRef()
  const [ifHover, setIfHover] = useState(false)
  const borderDuration = 0.35
  const defaultBorderColor = 'rgba(34, 34, 34, 0.10)'
  const [isContentVisible, setIsContentVisible] = useState(true) // 新增状态控制内容显示
  // 新增状态控制卡片头部样式
  const [headerStyle, setHeaderStyle] = useState('layout-header')

  // 切换内容显示的处理函数
  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible)
    // 切换卡片头部样式，根据您的样式表设置对应的类名
    setHeaderStyle(isContentVisible ? 'layout-header-hiden' : 'layout-header')
    // 调用回调函数来更新节点尺寸
    if (onToggleVisibility) {
      onToggleVisibility(!isContentVisible)
    }
  }
  const handleCardResizeDebounce = useCallback(
    debounce(
      (width: number, height: number) => {
        // 更新节点大小
        node.prop('size', { width: width, height: height })
      },
      100,
      { leading: true, trailing: true, maxWait: 1000 }
    ),
    []
  )
  useEffect(() => {
    const cardDOM = sizeRef.current as HTMLElement
    const resizeObserver = new ResizeObserver((entries) => {
      handleCardResizeDebounce(
        entries[0].target.clientWidth,
        entries[0].target.clientHeight
      )
    })

    node && resizeObserver.observe(cardDOM)

    return () => resizeObserver.unobserve(cardDOM)
  }, [])
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
      <motion.div
        ref={sizeRef}
        {...styleClass(['layout'], { ...style })}
        onMouseEnter={() => setIfHover(true)}
        onMouseLeave={() => setIfHover(false)}
        animate={{
          boxShadow: ifHover
            ? '0 20px 25px rgba(0, 0, 0, 0.1), 0 8px 10px rgba(0, 0, 0, 0.08)'
            : '0 20px 25px rgba(0, 0, 0, 0.045), 0 8px 10px rgba(0, 0, 0, 0.045)',
        }}
        transition={{ ...motionEasing, duration: borderDuration }}
      >
        <motion.div
          {...styleClass([headerStyle])}
          animate={{
            borderColor: ifHover ? hoverBorderColor : defaultBorderColor,
          }}
          transition={{ ...motionEasing, duration: borderDuration }}
        >
          <motion.div {...styleClass(['layout-header-card'])}>
            <div {...styleClass(['layout-header-card-icon'])}>{icon}</div>
            <div {...styleClass(['layout-header-card-text'])}>{name}</div>
          </motion.div>
          <motion.div {...styleClass(['layout-header-buttongroup'])}>
            <Button
              type={'default'}
              size={'mini'}
              {...styleClass([], { width: 32, height: 32 })}
            >
              {logo}
            </Button>
            <Button
              type={'default'}
              size={'mini'}
              {...styleClass([], { width: 32, height: 32 })}
              onClick={toggleContentVisibility} // 绑定点击事件处理函数
            >
              {isContentVisible ? reveal : unreveal}
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          {...styleClass(['layout-content'])}
          animate={{
            borderColor: ifHover ? hoverBorderColor : defaultBorderColor,
          }}
          transition={{ ...motionEasing, duration: borderDuration }}
          style={{ display: isContentVisible ? 'block' : 'none' }} // 用CSS控制显示和隐藏
        >
          {children}
        </motion.div>
        <div
          {...styleClass(['layout-port', 'layout-port-left'], {
            top: MethodPortPosition.LT,
            display: isContentVisible ? 'block' : 'none',
          })}
        >
          {leftport}
        </div>
        <div
          {...styleClass(['layout-port', 'layout-port-right'], {
            bottom: MethodPortPosition.RB,
            display: isContentVisible ? 'block' : 'none',
          })}
        >
          {rightport}
        </div>
      </motion.div>
    </ConfigProvider>
  )
}
