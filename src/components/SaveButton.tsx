'use client'

import { useState } from "react"
import { Save, AlertCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useFlowStore } from "@/store/flowStore"

export const SaveButton = () => {
  const { validateFlow, setNodes, setEdges, setSelectedNodeId, nodes, edges } = useFlowStore()
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = () => {
    console.log('Current state:', { nodes, edges })
    
    const validation = validateFlow()
    console.log('Validation result:', validation)
    
    if (!validation.isValid) {
      setShowError(true)
      setShowSuccess(false)
      setTimeout(() => setShowError(false), 3000)
      return
    }
    
    setShowError(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
    console.log("Flow saved successfully!")
  }

  const handleClear = () => {
    setNodes([])
    setEdges([])
    setSelectedNodeId(null)
    console.log("Flow cleared!")
  }

  return (
    <div className="relative flex space-x-2">
      <Button 
        onClick={handleSave}
        className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
      >
        <Save className="h-4 w-4 mr-2" />
        Save Changes
      </Button>
      
      <Button 
        onClick={handleClear}
        variant="outline"
        className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Clear
      </Button>
      
      {showError && (
        <div className="absolute top-12 right-0 w-80 z-50">
          <Alert variant="destructive" className="bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              Cannot save Flow: More than one Node has empty target handles
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      {showSuccess && (
        <div className="absolute top-12 right-0 w-60 z-50">
          <Alert className="bg-teal-50 border-teal-200 dark:bg-teal-900/20 dark:border-teal-800">
            <AlertDescription className="text-teal-800 dark:text-teal-200">
              Flow saved successfully!
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}