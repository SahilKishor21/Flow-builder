'use client'

import { memo } from 'react'
import { Handle } from 'reactflow'
import { MessageSquare } from 'lucide-react'
import type { MessageNodeData } from '@/types'
import { useFlowStore } from '@/store/flowStore'

interface MessageNodeProps {
  id: string
  data: MessageNodeData
  selected?: boolean
}

const MessageNode = memo(({ id, data, selected }: MessageNodeProps) => {
  const { setSelectedNodeId } = useFlowStore()

  return (
    <div onClick={() => setSelectedNodeId(id)} className="cursor-pointer">
      <Handle
        type="target"
        position={'top' as any}
        style={{ background: '#14b8a6', width: '10px', height: '10px', border: '2px solid white' }}
      />
      
      <div className={`bg-white dark:bg-gray-800 border rounded-xl shadow-lg min-w-[200px] overflow-hidden transition-all duration-200 ${
        selected 
          ? 'border-blue-500 shadow-blue-200 dark:shadow-blue-800 ring-2 ring-blue-200 dark:ring-blue-700' 
          : 'border-gray-200 dark:border-gray-600 hover:shadow-xl'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-400 to-teal-500 px-4 py-3 border-b border-teal-300">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4 text-white" />
            <span className="text-sm font-semibold text-white">
              {data.label}
            </span>
          </div>
        </div>
        
        {/* Message Content */}
        <div className="p-4 bg-white dark:bg-gray-800">
          <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
            {data.text}
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={'bottom' as any}
        style={{ background: '#14b8a6', width: '10px', height: '10px', border: '2px solid white' }}
      />
    </div>
  )
})

MessageNode.displayName = 'MessageNode'

export default MessageNode