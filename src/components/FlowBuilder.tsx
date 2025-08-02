'use client'

import { useCallback, useRef, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
} from 'reactflow'
import 'reactflow/dist/style.css'

import { useFlowStore, onNodesChange, onEdgesChange, onConnect } from '@/store/flowStore'
import MessageNode from './MessageNode'

const nodeTypes = {
  messageNode: MessageNode,
}

export const FlowBuilder = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const { nodes, edges, addNode } = useFlowStore()
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      const type = event.dataTransfer.getData('application/reactflow')

      if (typeof type === 'undefined' || !type || !reactFlowBounds || !reactFlowInstance) {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      addNode(position)
    },
    [reactFlowInstance, addNode]
  )

  return (
    <div className="flex-1 h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        deleteKeyCode={['Backspace', 'Delete']}
        className="bg-gradient-to-br from-teal-50/50 to-white dark:from-gray-900 dark:to-gray-800"
      >
        <Controls className="bg-white dark:bg-gray-800 border border-teal-200 dark:border-gray-600 rounded-lg shadow-lg" />
        <Background variant="dots" gap={12} size={1} color="#14b8a6" />
      </ReactFlow>
    </div>
  )
}

const FlowBuilderWithProvider = () => (
  <ReactFlowProvider>
    <FlowBuilder />
  </ReactFlowProvider>
)

export default FlowBuilderWithProvider