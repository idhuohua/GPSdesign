import styles from './ExplanationView.module.scss'
import { FC, useContext, useEffect } from 'react'
import { observer } from 'mobx-react'
import { ViewTitle } from '@/components/ViewTitle/ViewTitle'
import { motion } from 'framer-motion'
import { cubicBezier } from '@motionone/easing'
import { TagTitle } from '@/components/TagTitle/TagTitle'
import likes_svg from './images/likes.svg'
import comments_svg from './images/comments.svg'
import words_svg from './images/words.svg'
import { Image } from 'antd'
import { HeatMap } from '@/components/3ExplanationView/HeatMap'
import { TimeList } from '@/components/3ExplanationView/TimeList'
import { useAppContext, useExplanationViewStore } from '@/hooks'

export const ExplanationView: FC = observer(() => {
  const context = useAppContext()
  const explanationViewStore = useExplanationViewStore()

  return (
    <motion.div
      className={styles['layout']}
      whileHover={{ boxShadow: '0px 1px 2px 4px rgba(0,0,0,0.1)' }}
      animate={{
        filter: explanationViewStore.viewLoading ? 'blur(3px)' : 'blur(0px)',
        scale: explanationViewStore.viewLoading ? 0.99 : 1,
      }}
      transition={{
        duration: 0.2,
        ease: cubicBezier(0.455, 0.03, 0.515, 0.955),
      }}
    >
      <ViewTitle title={'Explanation View'} />
      <div className={styles['section1']}>
        <span className={styles['section1-title']}>BASIC INFO</span>
        <div className={styles['section1-numbers']}>
          <div
            id={'likes'}
            className={styles['section1-numbers-item']}
            style={{ marginLeft: 22 }}
          >
            <TagTitle title={'Num of likes'} />
            <div className={styles['section1-numbers-item-group']}>
              <Image
                src={likes_svg}
                width={14}
                height={14}
                style={{ display: 'flex' }}
                preview={false}
                draggable={false}
              />
            </div>
          </div>
          <div
            id={'comments'}
            className={styles['section1-numbers-item']}
            style={{ marginLeft: 31 }}
          >
            <TagTitle title={'Num of comments'} />
            <div className={styles['section1-numbers-item-group']}>
              <Image
                src={comments_svg}
                width={14}
                height={14}
                style={{ display: 'flex' }}
                preview={false}
                draggable={false}
              />
            </div>
          </div>
          <div
            id={'words'}
            className={styles['section1-numbers-item']}
            style={{ marginLeft: 24 }}
          >
            <TagTitle title={'Num of words'} />
            <div className={styles['section1-numbers-item-group']}>
              <Image
                src={words_svg}
                width={14}
                height={14}
                style={{ display: 'flex' }}
                preview={false}
                draggable={false}
              />
            </div>
          </div>
        </div>
        <div className={styles['section1-status-wrapper']}>
          <div className={styles['section1-status-title']}>
            Question development status
          </div>
        </div>
      </div>
      <div className={styles['section2']}>
        <div className={styles['section2-title-wrapper']}>
          <span className={styles['section2-title-wrapper-title']}>
            PROCESS FLOW
          </span>
          <TagTitle title={'Calculated on a daily basis'} />
        </div>
      </div>

      <div className={styles['section3']}>
        <div className={styles['section3-title-wrapper']}>
          <span className={styles['section3-title-wrapper-title']}>
            TIMELINE VIEW
          </span>
          <TagTitle title={'Calculated every two hours'} />
        </div>
        <HeatMap style={{ marginTop: 16 }} />
        <TimeList style={{ marginLeft: 2, marginTop: 20 }} />
      </div>
    </motion.div>
  )
})
