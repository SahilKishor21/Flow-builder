'use client'

import { MessageSquare } from "lucide-react"
import { NodeType } from "@/types"

const NODE_TYPES: NodeType[] = [
  {
    id: 'message',
    type: 'messageNode',
    label: 'Message',
    icon: MessageSquare,
    description: 'Send a text message'
  }
]

export const NodesPanel = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    console.log('Dragging node type:', nodeType)
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="w-80 bg-white dark:bg-gray-900 border-l border-teal-200 dark:border-gray-700 h-full flex flex-col shadow-lg ">
      {/* Header */}
      <div className="p-4 border-b border-teal-200 dark:border-gray-700 bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30">
        <h3 className="font-semibold text-lg bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
          Nodes Panel
        </h3>
      </div>
      
      {/* Node Types */}
      <div className="p-6 space-y-4 flex-1 bg-teal-50/30 dark:bg-gray-900">
        {NODE_TYPES.map((nodeType) => {
          const IconComponent = nodeType.icon
          return (
            <div
              key={nodeType.id}
              className="cursor-grab active:cursor-grabbing hover:shadow-lg transform hover:scale-105 transition-all duration-200 p-4 rounded-xl border border-teal-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-md hover:border-teal-400 dark:hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-gray-700"
              draggable
              onDragStart={(e) => onDragStart(e, nodeType.type)}
            >
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow-md">
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-teal-800 dark:text-teal-200">{nodeType.label}</h4>
                  <p className="text-sm text-teal-600 dark:text-teal-400">{nodeType.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}