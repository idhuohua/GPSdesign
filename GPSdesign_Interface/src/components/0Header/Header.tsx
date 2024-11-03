import styles from './Header.module.scss'
import { Children, FC, ReactNode, useState } from 'react'
import { Button as AntDButton, FloatButton, Select, Modal } from 'antd'
import { useColorVar, useStyles } from '@/hooks/styles'

interface IHeader {
  Tab?: ReactNode
  button1?: ReactNode
  button2?: ReactNode
  userText?: ReactNode
  userConfirm?: ReactNode
  saveButton?: ReactNode
}
export const Header: FC<IHeader> = ({
  Tab,
  button1,
  button2,
  userText,
  userConfirm,
  saveButton,
}) => {
  const styleClass = useStyles(styles)
  const showGuidebook = () => {
    Modal.info({
      title: 'guidbook',
      content: (
        <div {...styleClass(['instruction-container'])}>
          <div {...styleClass(['instruction-row'])}>
            {`${`Left-Pressed`}： ${`Translation`}`}
          </div>
          <div
            {...styleClass(['instruction-row'])}
          >{`CTRL/ALT + ${`Mouse Wheel`}：${`Scaling`}`}</div>
          <div {...styleClass(['instruction-row'])}>
            {`${`Left-Pressed`} + ${`Drag`}：${`Selection`}`}
          </div>
        </div>
      ),
    })
  }
  return (
    <div {...styleClass(['header'])}>
      <div {...styleClass(['left'])}>
        {button1}
        {button2}
        {saveButton}
        {userText}
        {userConfirm}
      </div>
      <div {...styleClass(['subtitle'])}>Conceptual Design Web</div>
      <div {...styleClass(['right'])}>{Tab}</div>
    </div>
  )
}
