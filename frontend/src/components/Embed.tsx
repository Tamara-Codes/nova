import React from 'react'
import { EmbedBlock } from '../types'

interface EmbedProps {
  block: EmbedBlock
}

export const Embed: React.FC<EmbedProps> = ({ block }) => {
  const { url, embedType, caption, aspectRatio = '16:9' } = block

  const getEmbedUrl = (url: string, type: string): string => {
    if (type === 'video') {
      // Convert YouTube watch URLs to embed URLs
      if (url.includes('youtube.com/watch')) {
        const videoId = new URL(url).searchParams.get('v')
        return `https://www.youtube.com/embed/${videoId}`
      }
      if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1].split('?')[0]
        return `https://www.youtube.com/embed/${videoId}`
      }
    }
    return url
  }

  const embedUrl = getEmbedUrl(url, embedType)
  const [width, height] = aspectRatio.split(':').map(Number)
  const paddingBottom = `${(height / width) * 100}%`

  return (
    <div className="nova-embed">
      <div className="nova-embed-container" style={{ paddingBottom }}>
        <iframe
          src={embedUrl}
          className="nova-embed-iframe"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {caption && <p className="nova-embed-caption">{caption}</p>}
    </div>
  )
}
