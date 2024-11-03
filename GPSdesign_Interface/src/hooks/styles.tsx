import { RootContext } from '@/App.context'
import { CSSProperties, useCallback } from 'react'
import classNames from 'classnames/bind'

interface colorType {
  colorNames:
    | 'white'
    | 'primary'
    | 'btn-primary'
    | 'btn-primary-text'
    | 'btn-primary-hover'
    | 'btn-default'
    | 'btn-default-text'
    | 'btn-default-hover'
    | 'btn-neutral'
    | 'btn-neutral-text'
    | 'btn-neutral-hover'
    | 'btn-outline'
    | 'btn-outline-text'
    | 'btn-outline-hover'
    | 'btn-text'
    | 'btn-text-text'
    | 'btn-text-hover'
    | 'btn-disabled'
    | 'btn-disabled-text'
    | 'theme-grey3'
    | 'chatBubble-header-time'
    | 'chatBubble-bg-left'
    | 'chatBubble-bg-right'
}
const colorVars: Record<string, string> = {
  'color-white': '#FFFFFF',
  'color-primary': '#16A199',
  'color-btn-primary': '#16A199',
  'color-btn-primary-text': '#FFFFFF',
  'color-btn-primary-hover': '#047575',
  'color-btn-default': '#F2F2F2',
  'color-btn-default-text': '#110f0f',
  'color-btn-default-hover': '#F2F2F2',
  'color-btn-neutral': '#2B3440',
  'color-btn-neutral-text': '#D8DDE4',
  'color-btn-neutral-hover': '#1D232B',
  'color-btn-outline': '#FFFFFF',
  // 'color-btn-outline-text': '#16A199',
  'color-btn-outline-hover': '#FFFFFF',
  'color-btn-text': '#FFFFFF00',
  'color-btn-text-text': 'rgba(87,13,248,1)',
  'color-btn-text-hover': 'rgba(87,13,248,0.75)',
  'color-btn-disabled': '#F2F2F2',
  'color-btn-disabled-text': '#C5C5C5',
  'color-theme-grey3': '#F2F2F2',
  'color-chatBubble-header-time': '#8F949B',
  'color-chatBubble-bg-left': '#F3F4F8',
  'color-chatBubble-bg-right': '#2B3440',
}

export const useColorVar = (context?: RootContext) => {
  return useCallback((name: colorType['colorNames']) => {
    return colorVars['color-' + name]
  }, [])
}

export const useStyles = (
  CSSStyles: {
    [key: string]: string | CSSProperties
  } = {}
) => {
  interface IStyleClass {
    className?: string
    style?: any
  }
  const cx = classNames.bind(CSSStyles)
  return useCallback(
    (
      classes: (string | Record<string, boolean>)[],
      styles: any = [],
      props: IStyleClass = {}
    ) => {
      const flattenStyles = (stylesToFlatten: any[]): any => {
        const styleObject = {}
        const animationStyles: any[] = []
        stylesToFlatten.forEach((item) => {
          if (typeof item !== 'object') return
          if (item.viewDescriptors) {
            animationStyles.push(item)
          } else {
            Object.assign(styleObject, item)
          }
        })
        if (animationStyles.length > 0) {
          return [styleObject, ...animationStyles]
        } else {
          return styleObject
        }
      }

      let propsStyle = props.style || []
      if (typeof propsStyle === 'string') {
        throw 'no support for CSS string yet'
      }

      // 优先使用 style 数组进行预处理
      if (!Array.isArray(propsStyle)) {
        propsStyle = [propsStyle]
      }

      let currentStyle = styles
      // 优先使用 style 数组进行预处理
      if (!Array.isArray(currentStyle)) {
        currentStyle = [currentStyle]
      }

      const rawClassNames: string[] = []
      classes.map((arg) => {
        if (typeof arg === 'string') {
          rawClassNames.push(arg)
        } else {
          for (const argKey in arg) {
            arg[argKey] && rawClassNames.push(argKey)
          }
        }
      })

      const finalClassNames: string[] = []
      rawClassNames.map((className) => {
        finalClassNames.push(className)
        /* if (darkMode && CSSStyles[className + '_dark']) {
          finalClassNames.push(className + '_dark')
        }

        if (IS_H5 && CSSStyles[className + '_h5']) {
          finalClassNames.push(className + '_h5')
          if (darkMode && CSSStyles[className + '_h5_dark']) {
            finalClassNames.push(className + '_h5_dark')
          }
        }
        if (IS_WEAPP && CSSStyles[className + '_weapp']) {
          finalClassNames.push(className + '_weapp')
          if (darkMode && CSSStyles[className + '_weapp_dark']) {
            finalClassNames.push(className + '_weapp_dark')
          }
        } */
      })
      return {
        className:
          cx(...finalClassNames) +
          (props.className ? ` ${props.className}` : ''),
        style: flattenStyles([...currentStyle, ...propsStyle]),
      }
    },
    []
  )
}
