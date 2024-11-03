import styles from './TimeList.module.scss'
import { CSSProperties, FC } from 'react'
import { motion } from 'framer-motion'
import { cubicBezier } from '@motionone/easing'
import sort_svg from './images/sort.svg'
import { ITimeLineDataItem } from '@/store/explanationViewStore'

interface ITimeList {
  selectedDate?: string
  timeListData?: ITimeLineDataItem[]
  averageReadingRate?: number
  maxReadingRate?: number
  style?: CSSProperties
}

export const TimeList: FC<ITimeList> = ({
  selectedDate,
  timeListData,
  averageReadingRate,
  maxReadingRate,
  style = {},
}) => {
  return (
    <div className={styles['layout']} style={{ ...style }}>
      <div className={styles['headers']}>
        <div className={styles['headers-time']}>
          <img src={sort_svg} style={{ width: 16 }} draggable={false}></img>
          <span className={styles['headers-time-text']}>Time</span>
        </div>
        <span className={styles['headers-rec']}>Rec. Feq.</span>
        <span className={styles['headers-reading-rate']}>Reading rate</span>
        <span className={styles['headers-pressure']}>Pressure</span>
      </div>
      {timeListData.length > 0 && (
        <div className={styles['container']}>
          {timeListData.map(
            (item, index) =>
              // TODO: key值可能有误
              item['date'] === selectedDate && (
                <TimeListItem
                  key={index}
                  time={item['hour']}
                  recommendedFrequency={item['recommendedFrequency']}
                  readingRate={item['readingRate']}
                  maxReadingRate={maxReadingRate}
                  pressure={item['pressure']}
                />
              )
          )}
        </div>
      )}
    </div>
  )
}

interface ITimeListItem {
  time?: number
  recommendedFrequency?: number
  readingRate?: number
  maxReadingRate?: number
  pressure?: number
}
const TimeListItem: FC<ITimeListItem> = ({
  time,
  recommendedFrequency,
  readingRate,
  maxReadingRate,
  pressure,
}) => {
  return (
    <motion.div
      className={styles['item-layout']}
      initial={{
        background: 'rgba(252, 250, 245, 0)',
        boxShadow: '0px 1px 2px rgba(0,0,0,0)',
      }}
      whileHover={{
        background: 'rgba(252, 250, 245, 1)',
        boxShadow: '0px 1px 2px rgba(0,0,0,0.1)',
      }}
      transition={{
        duration: 0.2,
        ease: cubicBezier(0.455, 0.03, 0.515, 0.955),
      }}
    >
      <span className={styles['item-time']}>{`${time - 2}-${time}:00`}</span>
      <div className={styles['item-rec-feq']}>
        <HeatMapItem value={recommendedFrequency} />
        <span className={styles['item-rec-feq-text']}>
          {recommendedFrequency}
        </span>
      </div>
    </motion.div>
  )
}

// 临时组件内部用
interface IHeatMapItem {
  value: number
}
const HeatMapItem: FC<IHeatMapItem> = ({ value }) => {
  return (
    <>
      {value === 0 && <div className={styles['value0']}></div>}
      {value === 1 && <div className={styles['value1']}></div>}
      {value === 2 && <div className={styles['value2']}></div>}
      {value === 3 && <div className={styles['value3']}></div>}
      {value === 4 && <div className={styles['value4']}></div>}
      {(value === 5 || value === 6) && (
        <div className={styles['value56']}></div>
      )}
      {value === 7 && <div className={styles['value7']}></div>}
      {value === 8 && <div className={styles['value8']}></div>}
      {(value === 9 || value === 10) && (
        <div className={styles['value910']}></div>
      )}
    </>
  )
}
