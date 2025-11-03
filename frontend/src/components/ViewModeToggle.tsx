import React from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'

export type ViewMode = 'visual' | 'semantic' | 'ai' | 'dual'

interface ViewModeToggleProps {
  mode: ViewMode
  onModeChange: (mode: ViewMode) => void
}

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ mode, onModeChange }) => {
  const modes = [
    {
      id: 'visual' as ViewMode,
      label: 'Visual',
      icon: '👁️',
      description: 'Beautiful human-readable view'
    },
    {
      id: 'semantic' as ViewMode,
      label: 'Semantic',
      icon: '🌳',
      description: 'JSON structure with annotations'
    },
    {
      id: 'ai' as ViewMode,
      label: 'AI Vision',
      icon: '🤖',
      description: 'How RAG systems chunk it'
    },
    {
      id: 'dual' as ViewMode,
      label: 'Compare',
      icon: '⚡',
      description: 'Side-by-side comparison'
    },
  ]

  return (
    <div className="mt-8 pt-8 border-t border-gray-600">
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">View Mode</div>
      <Tabs value={mode} onValueChange={(value) => onModeChange(value as ViewMode)} className="w-full">
        <TabsList className="grid w-full grid-cols-2 gap-1 bg-transparent p-0">
          {modes.map((m) => (
            <TabsTrigger
              key={m.id}
              value={m.id}
              title={m.description}
              className="data-[state=active]:bg-[#0088CA] data-[state=active]:text-white data-[state=active]:border-[#0088CA] border border-gray-600 text-gray-300 text-sm h-10 hover:bg-gray-700"
            >
              <span className="mr-1.5">{m.icon}</span>
              {m.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
