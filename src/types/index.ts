export interface MessageNodeData {
  text: string
  label: string
}

export interface FlowNode {
  id: string
  type: string
  position: { x: number; y: number }
  data: MessageNodeData
}

export interface FlowEdge {
  id: string
  source: string
  target: string
  sourceHandle?: string | null
  targetHandle?: string | null
}

export interface FlowState {
  nodes: FlowNode[]
  edges: FlowEdge[]
  selectedNodeId: string | null
  isDarkMode: boolean
  nodeIdCounter: number
  
  // Actions
  setNodes: (nodes: FlowNode[]) => void
  setEdges: (edges: FlowEdge[]) => void
  setSelectedNodeId: (id: string | null) => void
  toggleDarkMode: () => void
  addNode: (position: { x: number; y: number }) => void
  updateNodeText: (nodeId: string, text: string) => void
  deleteNode: (nodeId: string) => void
  validateFlow: () => { isValid: boolean; error?: string }
}

export interface NodeType {
  id: string
  type: string
  label: string
  icon: React.ComponentType<any>
  description: string
}