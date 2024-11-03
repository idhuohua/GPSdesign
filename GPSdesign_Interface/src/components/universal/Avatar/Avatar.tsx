import { FC } from 'react'
import styles from './Avatar.module.scss'
import { useStyles } from '@/hooks/styles'
import { Image } from 'antd'

interface IAvatar {
  size?: 'large' | 'default' | 'small' | 'mini'
  status?: 'default' | 'online' | 'offline'
  imgUrl?: string
}

export const Avatar: FC<IAvatar> = ({
  size = 'default',
  status = 'default',
  imgUrl = 'https://s3.bmp.ovh/imgs/2023/08/19/a47468834ad28c16.png',
}) => {
  const styleClass = useStyles(styles)

  const getImgSize = (size: IAvatar['size']): number => {
    switch (size) {
      case 'large':
        return 64
      case 'default':
        return 40
      case 'small':
        return 32
      case 'mini':
        return 24
      default:
        return 40
    }
  }
  const imgSize = getImgSize(size)
  return (
    <div {...styleClass(['layout', `layout-${size}`])}>
      <Image src={imgUrl} preview={false} width={imgSize} height={imgSize} />
    </div>
  )
}
