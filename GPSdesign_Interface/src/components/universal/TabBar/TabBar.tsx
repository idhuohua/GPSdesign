import { CSSProperties, FC, ReactNode, useState } from 'react'
import { Tabs } from 'antd'
import { useColorVar, useStyles } from '@/hooks/styles'
import styles from '@/components/universal/TabBar/TabBar.module.scss' // 自定义样式文件

interface ITabBar {
  leftbutton?: string
  rightbutton?: string
  onTabChange?: (tab: string) => void
}
export const TabBar: FC<ITabBar> = ({
  leftbutton,
  rightbutton,
  onTabChange,
}) => {
  const [selectedSegment, setSelectedSegment] = useState(leftbutton)
  // 处理标签更改的函数
  const handleTabChange = (selectedTab: string) => {
    setSelectedSegment(selectedTab) // 更新内部状态
    if (onTabChange) {
      onTabChange(selectedTab)
    }
  }

  return (
    <div
      className={`${styles.segmentedControl} ${
        selectedSegment === leftbutton ? styles.leftActive : styles.rightActive
      }`}
    >
      <button
        onClick={() => handleTabChange(leftbutton)}
        className={
          selectedSegment === leftbutton ? styles.active : styles.inactiveLeft
        }
      >
        {leftbutton}
      </button>
      <button
        onClick={() => handleTabChange(rightbutton)}
        className={
          selectedSegment === rightbutton ? styles.active : styles.inactiveRight
        }
      >
        {rightbutton}
      </button>
    </div>
  )
}
