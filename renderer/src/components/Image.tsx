import React from 'react'
import { ImageBlock } from '../types'

interface ImageProps {
  block: ImageBlock
}

export const Image: React.FC<ImageProps> = ({ block }) => {
  const { src, alt, caption, width = '100%', style } = block

  const containerClassName = `nova-image-container nova-image-align-${style?.align || 'center'}`
  const imageClassName = `nova-image ${style?.rounded ? 'nova-image-rounded' : ''}`

  return (
    <figure className={containerClassName}>
      <img
        src={src}
        alt={alt}
        className={imageClassName}
        style={{ width }}
        loading="lazy"
      />
      {caption && <figcaption className="nova-image-caption">{caption}</figcaption>}
    </figure>
  )
}
