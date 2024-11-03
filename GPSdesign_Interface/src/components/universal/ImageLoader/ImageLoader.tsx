import { CSSProperties, FC } from 'react'
import styles from './ImageLoader.module.scss'

interface IImageLoader {
  name: 'boxes' // 待补充
  style?: CSSProperties
  className?: string
}

export const ImageLoader: FC<IImageLoader> = ({
  name,
  style = {},
  className,
}) => {
  return (
    <div style={{ ...style }} className={className}>
      {name === 'boxes' && (
        <div>
          <div className={styles['boxes']}>
            <div className={styles['box']}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className={styles['box']}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className={styles['box']}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className={styles['box']}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
