'use client'

import { useEffect } from 'react'
import { Laptop } from 'lucide-react'
import { useFlowStore } from '@/store/flowStore'
import { ThemeToggle } from '@/components/ThemeToggle'
import { SaveButton } from '@/components/SaveButton'
import { NodesPanel } from '@/components/NodesPanel'
import { SettingsPanel } from '@/components/SettingsPanel'
import FlowBuilder from '@/components/FlowBuilder'

export default function Home() {
  const { isDarkMode, selectedNodeId } = useFlowStore()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-teal-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 text-foreground bg-muted/50">
      {/* Header */}
      <header className="border-b border-teal-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 rounded-xl shadow-lg ">
              <Laptop className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 dark:from-teal-400 dark:via-cyan-400 dark:to-emerald-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
               Chatbot flow builder
              </h1>
              <p className="text-sm text-teal-600 dark:text-teal-400 mt-1 opacity-80">
                Drag nodes to build conversational flows
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            {!selectedNodeId && <SaveButton />}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <FlowBuilder />
        {selectedNodeId ? <SettingsPanel /> : <NodesPanel />}
      </div>
    </div>
  )
}