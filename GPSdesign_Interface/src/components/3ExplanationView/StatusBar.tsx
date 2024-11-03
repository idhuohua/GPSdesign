import styles from './StatusBar.module.scss'
import { CSSProperties, FC } from 'react'
import { Tooltip } from 'antd'
import { motion } from 'framer-motion'
import { cubicBezier } from '@motionone/easing'
import cursor_png from './images/cursor.png'

// 表示某个问题包含的所有回答在各个层级的分布状态，以及选中的回答处于哪个位置
export interface IStatusBar {
  distributionValue: [number, number, number, number, number, number] // 所有回答分成6的层级的分布比例
  currentStatus: number // 该回答目前所处的位置x坐标
  style?: CSSProperties
}
export const StatusBar: FC<IStatusBar> = ({
  distributionValue,
  currentStatus,
  style = {},
}) => {
  const colors: string[] = [
    'rgba(75, 105, 126, 1)',
    'rgba(124, 151, 171, 1)',
    'rgba(212, 206, 198, 1)',
    'rgba(195, 179, 171, 1)',
    'rgba(211, 146, 140, 1)',
    'rgba(198, 114, 105, 1)',
  ]
  return (
    <div className={styles['layout']} style={{ ...style }}>
      <div className={styles['bars-wrapper']}>
        {distributionValue.map((item, index) => (
          <BarItem
            key={index}
            index={index}
            value={distributionValue[index]}
            color={colors[index]}
            width={390 * distributionValue[index]}
          />
        ))}
      </div>
      <Tooltip
        title={`Current stage: ${currentStatus.toFixed(2)}`}
        placement={'bottom'}
        destroyTooltipOnHide={true}
      >
        <img
          src={cursor_png}
          style={{ left: currentStatus * 390 - 3 }}
          className={styles['layout-cursor']}
          draggable={false}
        />
      </Tooltip>
    </div>
  )
}

interface IBarItem {
  index: number
  value?: number
  color?: string
  width?: number
}
const BarItem: FC<IBarItem> = ({ index, value, color, width }) => {
  const levelUnion = (index: number) => {
    switch (index) {
      case 1:
        return '7&8'
      case 2:
        return '6'
      case 3:
        return '5'
      case 4:
        return '4'
      case 5:
        return '3'
      case 6:
        return '1&2'
    }
  }
  return (
    <Tooltip
      title={`Level ${levelUnion(index + 1)}: ${(value * 100).toFixed(1)}%`}
      destroyTooltipOnHide={true}
    >
      <motion.div
        className={styles['bar']}
        style={{ width: width, backgroundColor: color }}
        whileHover={{ borderRadius: 12 }}
        transition={{
          duration: 0.2,
          ease: cubicBezier(0.455, 0.03, 0.515, 0.955),
        }}
      ></motion.div>
    </Tooltip>
  )
}
