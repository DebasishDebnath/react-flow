// import React, { useCallback, useMemo } from "react";
// import {
//   ReactFlow,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   Handle,
// } from "@xyflow/react";

// import "@xyflow/react/dist/style.css";

// const initialNodes = [
//   {
//     id: "1",
//     position: { x: 0, y: 0 },
//     data: { label: "Node one", isRoot: true },
//   },
//   // { id: "2", position: { x: 0, y: 100 }, data: { label: "Node Two" } },
// ];
// const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

// const CustomNode = ({ id, data }) => {
//   return (
//     <div
//       style={{
//         padding: "10px",
//         border: "1px solid #ddd",
//         borderRadius: "5px",
//         background: "#fff",
//       }}
//     >
//       {data.label}
//       {data.isRoot && (
//         <button
//           style={{ display: "block", marginTop: "10px" }}
//           onClick={() => data.onAddSubNode(id)}
//         >
//           Add Sub-Item
//         </button>
//       )}
//       <Handle type="source" position="bottom" />
//       <Handle type="target" position="top" />
//     </div>
//   );
// };

// const nodeTypes = {
//   customNode: CustomNode,
// };

// export default function App() {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     [setEdges]
//   );

//   const onAddSubNode = useCallback(
//     (parentId) => {
//       const newNode = {
//         id: `${nodes.length + 1}`,
//         position: { x: 0, y: (nodes.length + 1) * 100 },
//         data: { label: `Sub-Node ${nodes.length + 1}` },
//       };
//       setNodes((nds) => nds.concat(newNode));
//       setEdges((eds) =>
//         eds.concat({
//           id: `e${parentId}-${newNode.id}`,
//           source: parentId,
//           target: newNode.id,
//         })
//       );
//     },
//     [nodes, setNodes, setEdges]
//   );

//   const customNodes = useMemo(
//     () =>
//       nodes.map((node) => ({
//         ...node,
//         type: "customNode",
//         data: { ...node.data, onAddSubNode },
//       })),
//     [nodes, onAddSubNode]
//   );

//   return (
//     <div style={{ width: "100vw", height: "100vh" }}>
//       <ReactFlow
//         nodes={customNodes}
//         edges={edges}
//         nodeTypes={nodeTypes}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//       />
//     </div>
//   );
// }

import React, { useCallback, useMemo } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Node one", isRoot: true },
  },
  // { id: "2", position: { x: 0, y: 100 }, data: { label: "Node Two" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const CustomNode = ({ id, data }) => {
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        background: "#fff",
      }}
    >
      {data.label}
      <button
        style={{ display: "block", marginTop: "30px" }}
        onClick={() => data.onAddSubNode(id)}
      >
        Add Sub-Item
      </button>
      <Handle type="source" position="bottom" />
      <Handle type="target" position="top" />
    </div>
  );
};

const nodeTypes = {
  customNode: CustomNode,
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onAddSubNode = useCallback(
    (parentId) => {
      const parentNode = nodes.find((node) => node.id === parentId);
      const newNode = {
        id: `${nodes.length + 1}`,
        position: {
          x: parentNode.position.x + 100,
          y: parentNode.position.y + 100,
        },
        data: { label: `Sub-Node ${nodes.length + 1}` },
      };
      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) =>
        eds.concat({
          id: `e${parentId}-${newNode.id}`,
          source: parentId,
          target: newNode.id,
        })
      );
    },
    [nodes, setNodes, setEdges]
  );

  const customNodes = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        type: "customNode",
        data: { ...node.data, onAddSubNode },
      })),
    [nodes, onAddSubNode]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={customNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </div>
  );
}
