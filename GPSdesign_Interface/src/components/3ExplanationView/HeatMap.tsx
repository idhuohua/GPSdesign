import styles from './HeatMap.module.scss'
import { CSSProperties, FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cubicBezier } from '@motionone/easing'
import heat_map_legend_png from './images/heat-map-legend.png'
import { Popover } from 'antd'
import { useExplanationViewStore } from '@/hooks'

interface IHeatMap {
  averageReadingRate?: number // 该回答的平均阅读率
  style?: CSSProperties
}

export const HeatMap: FC<IHeatMap> = ({ averageReadingRate, style = {} }) => {
  const explanationViewStore = useExplanationViewStore()

  const [selectedDate, setSelectedDate] = useState('5.12')
  useEffect(() => {
    // rootStore.explanationView.handleSelectedDate(selectedDate)
  }, [selectedDate])

  const test = [
    [1, 0, 4, 0, 3, 0, 1, 0, 4, 0, 2, 0],
    [2, 4, 0, 4, 7, 2, 6, 3, 1, 0, 0, 1],
    [1, 1, 5, 7, 5, 0, 3, 1, 0, 2, 0, 0],
    [1, 2, 0, 7, 8, 4, 1, 0, 3, 3, 3, 4],
    [2, 0, 3, 8, 7, 4, 4, 4, 0, 4, 1, 1],
    [2, 1, 0, 2, 8, 5, 7, 5, 4, 2, 7, 2],
    [4, 0, 3, 7, 7, 5, 7, 7, 6, 6, 5, 9],
    [4, 0, 3, 7, 7, 3, 6, 7, 7, 6, 5, 9],
    [7, 0, 1, 2, 4, 7, 4, 8, 9, 9, 8, 5],
    [5, 1, 2, 2, 4, 8, 5, 9, 9, 9, 8, 4],
    [7, 3, 1, 2, 5, 8, 7, 9, 8, 9, 9, 7],
  ]

  return (
    <div className={styles['layout']} style={{ ...style }}>
      <div className={styles['legend-wrapper']}>
        <div className={styles['legend-left']}>
          <span className={styles['legend-left-text']}>
            Recommended frequency
          </span>
          <div className={styles['legend-left-rect1']}></div>
          <div className={styles['legend-left-rect2']}></div>
          <div className={styles['legend-left-rect3']}></div>
        </div>
        <div className={styles['legend-right']}>
          <div className={styles['legend-right-text']}>
            Average reading rate:
          </div>
          <div
            className={styles['legend-right-number']}
          >{`${averageReadingRate}%`}</div>
        </div>
      </div>

      <div className={styles['content']}>
        <DateAxios
          style={{ marginTop: 8.5, marginRight: 7.5 }}
          selectedDate={selectedDate}
        />
        <img
          src={heat_map_legend_png}
          className={styles['heat-map-legend']}
          draggable={false}
        />
      </div>
      <div id={'hour-axios'} className={styles['hour-axios-wrapper']}>
        {[2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24].map((item, index) => (
          <span key={index} className={styles['hour-axios-number']}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

interface IHeatItem {
  value: number // 0-10
  date: string
  hour: number
}
const HeatItem: FC<IHeatItem> = ({ value, date, hour }) => {
  const circleColor = [
    'rgba(124, 151, 171, 1)',
    'rgba(239, 220, 196, 0.6)',
    'rgba(239, 220, 196, 0.7)',
    'rgba(239, 220, 196, 0.8)',
    'rgba(239, 220, 196, 0.9)',
    'rgba(239, 220, 196, 0.9)',
    'rgba(227, 186, 182, 1)',
    '#D3928C',
    '#D67A70',
    '#D67A70',
  ]
  return (
    <div className={styles['heat-item-layout']}>
      <Popover
        content={
          <div className={styles['heat-item-popover-content']}>
            <span className={styles['heat-item-popover-text']}>
              {`${date} ${hour - 2}:00 - ${hour}:00`}
            </span>
            <div className={styles['heat-item-popover-value-info']}>
              <div
                className={styles['heat-item-popover-value-info-circle']}
                style={{
                  background: value > 0 ? circleColor[value - 1] : '#FFFFFF',
                }}
              />
              <span className={styles['heat-item-popover-value-info-text']}>
                {`value: ${value}`}
              </span>
            </div>
          </div>
        }
      >
        {value === 1 && (
          <motion.div
            className={styles['heat-item-value1']}
            whileHover={{
              scaleX: 1.2,
              boxShadow: '0px 1px 3px rgba(0,0,0,0.4)',
            }}
            transition={{
              duration: 0.15,
              ease: cubicBezier(0.455, 0.03, 0.515, 0.955),
            }}
          ></motion.div>
        )}
        {value === 2 && (
          <motion.div
            whileHover={{
              scaleX: 1.2,
              boxShadow: '0px 1px 3px rgba(0,0,0,0.4)',
            }}
            transition={{
              duration: 0.15,
              ease: cubicBezier(0.455, 0.03, 0.515, 0.955),
            }}
            className={styles['heat-item-value2']}
          ></motion.div>
        )}
        {value === 3 && (
          <motion.div
            whileHover={{
              scaleX: 1.2,
              boxShadow: '0px 1px 3px rgba(0,0,0,0.4)',
            }}
            transition={{
              duration: 0.15,
              ease: cubicBezier(0.455, 0.03, 0.515, 0.955),
            }}
            className={styles['heat-item-value3']}
          ></motion.div>
        )}
        {value === 4 && (
          <motion.div
            whileHover={{
              scaleX: 1.2,
              boxShadow: '0px 1px 3px rgba(0,0,0,0.4)',
            }}
            transition={{
              duration: 0.15,
              ease: cubicBezier(0.455, 0.03, 0.515, 0.955),
            }}
            className={styles['heat-item-value4']}
          ></motion.div>
        )}
        {(value === 5 || value === 6) && (
          <motion.div
            whileHover={{
              scaleX: 1.2,
              boxShadow: '0px 1px 3px rgba(0,0,0,0.4)',
            }}
            transition={{
              duration: 0.15,
              ease: cubicBezier(0.455, 0.03, 0.515, 0.955),
            }}
            className={styles['heat-item-value56']}
          ></motion.div>
        )}
        {value === 7 && (
          <motion.div
            whileHover={{
              scaleX: 1.2,
              boxShadow: '0px 1px 3px rgba(0,0,0,0.4)',
            }}
            transition={{
              duration: 0.15,
              ease: cubicBezier(0.455, 0.03, 0.515, 0.955),
            }}
            className={styles['heat-item-value7']}
          ></motion.div>
        )}
        {value === 8 && (
          <motion.div
            whileHover={{
              scaleX: 1.2,
              boxShadow: '0px 1px 3px rgba(0,0,0,0.4)',
            }}
            transition={{
              duration: 0.15,
              ease: cubicBezier(0.455, 0.03, 0.515, 0.955),
            }}
            className={styles['heat-item-value8']}
          ></motion.div>
        )}
        {(value === 9 || value === 10) && (
          <motion.div
            whileHover={{
              scaleX: 1.2,
              boxShadow: '0px 1px 3px rgba(0,0,0,0.4)',
            }}
            transition={{
              duration: 0.15,
              ease: cubicBezier(0.455, 0.03, 0.515, 0.955),
            }}
            className={styles['heat-item-value910']}
          ></motion.div>
        )}
      </Popover>
    </div>
  )
}

interface IDateAxios {
  selectedDate?: string
  style?: CSSProperties
}
const DateAxios: FC<IDateAxios> = ({ selectedDate, style = {} }) => {
  return (
    <div className={styles['date-axios-wrapper']} style={{ ...style }}>
      {[
        '5.3',
        '5.4',
        '5.5',
        '5.6',
        '5.7',
        '5.8',
        '5.9',
        '5.10',
        '5.11',
        '5.12',
        '5.13',
      ].map((item, index) => (
        <motion.div
          key={item}
          className={styles['date-axios-text']}
          animate={{
            color:
              selectedDate === item
                ? 'rgba(51,51,51,1)'
                : selectedDate === ''
                ? 'rgba(122, 124, 134, 1)'
                : 'rgba(122, 124, 134, 0.5)',
          }}
          transition={{
            duration: 0.15,
            ease: cubicBezier(0.455, 0.03, 0.515, 0.955),
          }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  )
}
