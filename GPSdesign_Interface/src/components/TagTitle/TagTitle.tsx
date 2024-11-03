import styles from './TagTitle.module.scss'
import { CSSProperties, FC } from 'react'
import { motion } from 'framer-motion'
import { cubicBezier } from '@motionone/easing'

interface ITagTitle {
  title?: string
  style?: CSSProperties
}
export const TagTitle: FC<ITagTitle> = ({ title = '', style = {} }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <motion.div
        className={styles['layout']}
        style={{ ...style }}
        whileHover={{ boxShadow: '0px 0px 1px 1px rgba(0,0,0,0.1)' }}
        transition={{
          duration: 0.1,
          ease: cubicBezier(0.455, 0.03, 0.515, 0.955),
        }}
      >
        <span className={styles['title']}>{title}</span>
      </motion.div>
    </div>
  )
}
