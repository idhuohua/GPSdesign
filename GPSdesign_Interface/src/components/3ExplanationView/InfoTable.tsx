import styles from './InfoTable.module.scss'
import { CSSProperties, FC } from 'react'

interface IInfoTable {
  answerID?: string
  questionID?: string
  topicID?: string
  style?: CSSProperties
}

export const InfoTable: FC<IInfoTable> = ({
  answerID = 'A19275549',
  questionID = 'Q66329',
  topicID = 'T986',
  style = {},
}) => {
  return (
    <div className={styles['layout']} style={{ ...style }}>
      <div className={styles['line1']}>
        <div className={styles['line1-column1']}>
          <span className={styles['table-text']}>Answer ID</span>
        </div>
        <div className={styles['line1-column2']}>
          <span className={styles['table-text']}>Question ID</span>
        </div>
        <div className={styles['line1-column3']}>
          <span className={styles['table-text']}>Topic ID</span>
        </div>
      </div>
      <div className={styles['line2']}>
        <div className={styles['line2-column1']}>
          <span className={styles['table-text']}>{`# ${answerID}`}</span>
        </div>
        <div className={styles['line2-column2']}>
          <span className={styles['table-text']}>{`# ${questionID}`}</span>
        </div>
        <div className={styles['line2-column3']}>
          <span className={styles['table-text']}>{`# ${topicID}`}</span>
        </div>
      </div>
    </div>
  )
}
