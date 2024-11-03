import { MainGraph } from '@/components/MainGraph/MainGraph'
import React from 'react'
import { useStyles } from '@/hooks/styles'

const Graph = () => {
  const styleClass = useStyles()
  return (
    <div
      {...styleClass([], {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100%',
        height: '100%',
      })}
    >
      <MainGraph />
    </div>
  )
}

export default Graph
