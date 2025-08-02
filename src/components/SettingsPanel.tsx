'use client'

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useFlowStore } from "@/store/flowStore"

export const SettingsPanel = () => {
  const { nodes, selectedNodeId, setSelectedNodeId, updateNodeText } = useFlowStore()
  
  const selectedNode = nodes.find(node => node.id === selectedNodeId)

  if (!selectedNode) return null

  return (
    <div className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedNodeId(null)}
              className="h-8 w-8 hover:bg-teal-100 dark:hover:bg-teal-800/50 text-teal-600 dark:text-teal-400"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h3 className="font-semibold text-lg bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
              Message
            </h3>
          </div>
          <Button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-md font-medium px-4 py-2 text-sm"
            onClick={() => {
              console.log('Save Changes clicked')
            }}
          >
            Save Changes
          </Button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex-1 bg-teal-50/30 dark:bg-gray-900">
        <div className="space-y-4">
          <div>
            <Label 
              htmlFor="message-text" 
              className="text-sm font-semibold text-teal-700 dark:text-teal-300 mb-3 block"
            >
              Text
            </Label>
            <div className="mt-2">
              <textarea
                id="message-text"
                value={selectedNode.data.text}
                onChange={(e) => updateNodeText(selectedNode.id, e.target.value)}
                placeholder="Enter message text..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-teal-200 dark:border-teal-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-teal-400 dark:placeholder:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 resize-none shadow-sm hover:shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}