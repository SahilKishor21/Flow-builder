import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow'
import type { FlowState, FlowNode, FlowEdge } from '@/types'

export const useFlowStore = create<FlowState>()(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      selectedNodeId: null,
      isDarkMode: false,
      nodeIdCounter: 1,

      setNodes: (nodes) => set({ nodes }),
      setEdges: (edges) => set({ edges }),
      setSelectedNodeId: (id) => set({ selectedNodeId: id }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      addNode: (position) => {
        const { nodeIdCounter } = get()
        const newNode: FlowNode = {
          id: `node_${nodeIdCounter}`,
          type: 'messageNode',
          position,
          data: {
            text: `test message ${nodeIdCounter}`,
            label: 'Send Message',
          },
        }
        
        set((state) => ({
          nodes: [...state.nodes, newNode],
          nodeIdCounter: nodeIdCounter + 1,
        }))
      },

      updateNodeText: (nodeId, text) => {
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === nodeId
              ? { ...node, data: { ...node.data, text } }
              : node
          ),
        }))
      },

      deleteNode: (nodeId) => {
        set((state) => ({
          nodes: state.nodes.filter((node) => node.id !== nodeId),
          edges: state.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
          selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
        }))
      },

      validateFlow: () => {
        const { nodes, edges } = get()
        
        if (nodes.length <= 1) {
          return { isValid: true }
        }
        
        const nodesWithoutTargets = nodes.filter((node) => {
          const hasIncomingEdge = edges.some((edge) => edge.target === node.id)
          return !hasIncomingEdge
        })
        
        if (nodesWithoutTargets.length > 1) {
          return {
            isValid: false,
            error: 'More than one node has empty target handles',
          }
        }
        
        return { isValid: true }
      },
    }),
    {
      name: 'chatbot-flow-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        nodes: state.nodes,
        edges: state.edges,
        nodeIdCounter: state.nodeIdCounter,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
)

// Helper functions for React Flow
export const onNodesChange = (changes: any) => {
  const { nodes, setNodes } = useFlowStore.getState()
  setNodes(applyNodeChanges(changes, nodes as any) as any)
}

export const onEdgesChange = (changes: any) => {
  const { edges, setEdges } = useFlowStore.getState()
  setEdges(applyEdgeChanges(changes, edges as any) as any)
}

export const onConnect = (connection: any) => {
  const { edges, setEdges } = useFlowStore.getState()
  
  const existingEdge = edges.find((edge: any) => 
    edge.source === connection.source && edge.sourceHandle === connection.sourceHandle
  )
  
  if (existingEdge) {
    const filteredEdges = edges.filter((edge: any) => edge.id !== existingEdge.id)
    setEdges(addEdge(connection, filteredEdges as any) as any)
  } else {
    setEdges(addEdge(connection, edges as any) as any)
  }
}