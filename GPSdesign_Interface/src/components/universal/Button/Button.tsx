import styles from './Button.module.scss'
import { CSSProperties, FC, ReactNode, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { motionEasing } from '@/config'
import { useColorVar, useStyles } from '@/hooks/styles'
import { SvgIcon } from '@/components/icons'
import { LoadingQuarter } from '@/components/icons/LoadingQuarter'
import { LoadingOutlined } from '@ant-design/icons'

interface IButton {
  size?: 'large' | 'default' | 'small' | 'mini'
  type?: 'primary' | 'default' | 'neutral' | 'outline' | 'text'
  disabled?: boolean
  loading?: boolean
  children?: ReactNode
  onClick?: () => void
  className?: string
  style?: CSSProperties
}
export const Button: FC<IButton> = ({
  size = 'default',
  type = 'primary',
  disabled = false,
  loading = false,
  children,
  className,
  style = {},
  onClick,
  ...rest
}) => {
  const c = useColorVar()
  const styleClass = useStyles(styles)
  // const buttonType = type === 'outline' ? 'primary' : type
  const buttonType = type
  return (
    <motion.div
      {...rest}
      {...styleClass(
        ['button-layout', `button-layout-${size}`],
        {
          backgroundColor: disabled
            ? buttonType === 'outline' || buttonType === 'text'
              ? c(`btn-${buttonType}`)
              : c('btn-disabled')
            : c(`btn-${buttonType}`),
          color: disabled ? c('btn-disabled-text') : undefined,
          border:
            buttonType === 'outline'
              ? disabled
                ? `1px solid ${c(`btn-disabled`)}`
                : `1px solid ${c(`btn-${buttonType}-text`)}`
              : undefined,
          borderRadius: buttonType === 'outline' ? '8px' : undefined,
        },
        { className, style }
      )}
      whileHover={
        disabled || loading
          ? undefined
          : {
              backgroundColor:
                buttonType === 'text'
                  ? undefined
                  : c(`btn-${buttonType}-hover`),
              color: buttonType === 'text' ? c('btn-text-hover') : undefined,
              border:
                buttonType === 'outline' ? `1px solid #4A07DA` : undefined,
            }
      }
      whileTap={disabled || loading ? undefined : { scale: 0.95 }}
      transition={motionEasing}
      // onClick={() => onClick()}
      onClick={() => !disabled && !loading && onClick && onClick()}
    >
      <div {...styleClass(['button-item'])}>
        {/* {loading && (
            <SvgIcon icon={LoadingQuarter} size={18} color={c('white')} />
          )} */}
        {loading && (
          <LoadingOutlined
            {...styleClass([], {
              fontSize: 16,
              color: disabled
                ? c('btn-disabled-text')
                : c(`btn-${buttonType}-text`),
            })}
            rev={undefined}
          />
        )}
        <span
          {...styleClass(['button-item', `button-item-${size}`], {
            color: disabled
              ? c('btn-disabled-text')
              : c(`btn-${buttonType}-text`),
          })}
        >
          {children}
        </span>
      </div>
    </motion.div>
  )
}
