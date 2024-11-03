import React from 'react'
import { Url } from 'url'

export const ImageContent = ({
  image,
  text,
}: {
  image: string
  text: string
}) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={image}
        alt="图像内容"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
      {text}
    </div>
  )
}
