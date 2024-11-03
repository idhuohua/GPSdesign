import styles from './ViewTitle.module.scss'
import { FC } from 'react'

interface IViewTitle {
  title?: string
}
export const ViewTitle: FC<IViewTitle> = ({ title = '' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div className={styles['layout']}>
        <span className={styles['title']}>{title}</span>
      </div>
    </div>
  )
}
