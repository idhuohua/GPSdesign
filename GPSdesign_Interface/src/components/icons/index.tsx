import {CSSProperties, FC} from 'react'
import Icon from "@ant-design/icons";
import {ComponentType,SVGProps,ForwardRefExoticComponent} from "react";
import {CustomIconComponentProps} from "@ant-design/icons/lib/components/Icon";
import {useStyles} from "@/hooks/styles";

interface ISvgIcon {
  icon?: ComponentType<CustomIconComponentProps | SVGProps<SVGSVGElement>> | ForwardRefExoticComponent<CustomIconComponentProps> // 图标名
  size?: number // 大小（默认方形）
  color?: string
  //spin?: boolean // 是否有旋转动画
  style?: CSSProperties
  className?: string
}

// 自定义图标
export const SvgIcon:FC<ISvgIcon> = ({icon,size = 14,color,style={},className = ''}) => {
  const styleClass = useStyles()
  return (
    <Icon component={icon} rev={undefined} {...styleClass([className],{fontSize:size,color:color,...style})}></Icon>
  )
}



