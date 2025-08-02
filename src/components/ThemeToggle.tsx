'use client'

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFlowStore } from "@/store/flowStore"

export const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useFlowStore()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleDarkMode}
      className="h-10 w-10 border-teal-300 dark:border-gray-600 hover:bg-teal-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-teal-600" />
      )}
    </Button>
  )
}