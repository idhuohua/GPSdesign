import styles from './Loader.module.scss'
import { FC, ReactNode } from 'react'
import { useStyles } from '@/hooks/styles'

interface ILoader {
  type?: 'threeBody'
}
export const Loader: FC<ILoader> = ({ type }) => {
  const renderLoader = (): ReactNode => {
    switch (type) {
      case 'threeBody':
        return <ThreeBodyLoader />
      default:
        return <div></div>
    }
  }

  return <>{renderLoader()}</>
}

const ThreeBodyLoader = () => {
  const styleClass = useStyles(styles)
  return (
    <div {...styleClass(['three-body'])}>
      <div {...styleClass(['three-body__dot'])}></div>
      <div {...styleClass(['three-body__dot'])}></div>
      <div {...styleClass(['three-body__dot'])}></div>
    </div>
  )
}
