import React, { FC } from 'react'
import { SvgIcon } from '@/components/icons'
import { InputPortTip } from '@/components/icons/InputPortTip'
import { OutputPortTip } from '@/components/icons/OutputPortTip'
import { useLang } from '@/hooks/i18n'
import lang from '@/components/MainGraph/MainGraph.i18n.json'
import { useColorVar, useStyles } from '@/hooks/styles'
import styles from '@/components/MainGraph/PortTooltip.module.scss'
import { Popover } from 'antd'
import { TooltipPlacement } from 'antd/es/tooltip'

interface IPortTooltip {
  placement?: TooltipPlacement
  portGroup: 'in' | 'out'
  tip?: string
}

export const PortTooltip: FC<IPortTooltip> = ({
  placement,
  portGroup,
  tip = '',
}) => {
  const { t } = useLang(lang, 'MainGraph')
  const c = useColorVar()
  const styleClass = useStyles(styles)
  return (
    <Popover
      trigger={'hover'}
      placement={
        typeof placement === 'undefined'
          ? portGroup === 'in'
            ? 'left'
            : 'right'
          : placement
      }
      overlayInnerStyle={{ padding: '10px 8px 7px 8px' }}
      content={
        <div {...styleClass(['layout'])}>
          <SvgIcon
            icon={portGroup === 'in' ? InputPortTip : OutputPortTip}
          ></SvgIcon>
          <div {...styleClass(['text'])}>{tip}</div>
        </div>
      }
    >
      <div className={styles['my-port']} />
    </Popover>
  )
}
