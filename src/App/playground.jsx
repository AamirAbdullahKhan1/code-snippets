"use client"

import { useState, useRef, useCallback } from "react"

export default function InteractivePlayground() {
  const [canvasElements, setCanvasElements] = useState([])
  const [selectedElement, setSelectedElement] = useState(null)
  const [viewportWidth, setViewportWidth] = useState("desktop")
  const [showCode, setShowCode] = useState(false)
  const [draggedElement, setDraggedElement] = useState(null)
  const canvasRef = useRef(null)

  // Available HTML elements that can be dragged
  const htmlElements = [
    {
      type: "heading",
      label: "Heading",
      icon: "📝",
      defaultProps: { text: "Heading", level: "h1", color: "#000000", fontSize: "32px" },
    },
    {
      type: "paragraph",
      label: "Paragraph",
      icon: "📄",
      defaultProps: { text: "This is a paragraph text.", color: "#333333", fontSize: "16px" },
    },
    {
      type: "button",
      label: "Button",
      icon: "🔘",
      defaultProps: { text: "Click Me", backgroundColor: "#007bff", color: "#ffffff", padding: "10px 20px" },
    },
    {
      type: "image",
      label: "Image",
      icon: "🖼️",
      defaultProps: { src: "/placeholder.svg?height=200&width=300", alt: "Image", width: "300px", height: "200px" },
    },
    {
      type: "container",
      label: "Container",
      icon: "📦",
      defaultProps: { backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px", minHeight: "100px" },
    },
    {
      type: "input",
      label: "Input Field",
      icon: "📝",
      defaultProps: { placeholder: "Enter text...", type: "text", padding: "8px 12px", border: "1px solid #ccc" },
    },
    {
      type: "list",
      label: "List",
      icon: "📋",
      defaultProps: { items: ["Item 1", "Item 2", "Item 3"], listType: "ul", color: "#333333" },
    },
    {
      type: "link",
      label: "Link",
      icon: "🔗",
      defaultProps: { text: "Click here", href: "#", color: "#007bff", textDecoration: "underline" },
    },
  ]

  // Viewport sizes for responsive testing
  const viewports = {
    mobile: { width: "375px", label: "Mobile (375px)" },
    tablet: { width: "768px", label: "Tablet (768px)" },
    desktop: { width: "100%", label: "Desktop (100%)" },
  }

  // Handle drag start
  const handleDragStart = (e, element) => {
    setDraggedElement(element)
    e.dataTransfer.effectAllowed = "copy"
  }

  // Handle drop on canvas
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      if (!draggedElement) return

      const canvas = canvasRef.current
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newElement = {
        id: Date.now() + Math.random(),
        type: draggedElement.type,
        x: Math.max(0, x - 50),
        y: Math.max(0, y - 25),
        props: { ...draggedElement.defaultProps },
      }

      setCanvasElements((prev) => [...prev, newElement])
      setDraggedElement(null)
    },
    [draggedElement],
  )

  // Handle drag over canvas
  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
  }

  // Handle element selection
  const handleElementClick = (element) => {
    setSelectedElement(element)
  }

  // Handle element property update
  const updateElementProperty = (elementId, property, value) => {
    setCanvasElements((prev) =>
      prev.map((el) => (el.id === elementId ? { ...el, props: { ...el.props, [property]: value } } : el)),
    )
    if (selectedElement && selectedElement.id === elementId) {
      setSelectedElement((prev) => ({
        ...prev,
        props: { ...prev.props, [property]: value },
      }))
    }
  }

  // Handle element position update
  const updateElementPosition = (elementId, x, y) => {
    setCanvasElements((prev) => prev.map((el) => (el.id === elementId ? { ...el, x, y } : el)))
  }

  // Delete element
  const deleteElement = (elementId) => {
    setCanvasElements((prev) => prev.filter((el) => el.id !== elementId))
    if (selectedElement && selectedElement.id === elementId) {
      setSelectedElement(null)
    }
  }

  // Generate HTML code
  const generateHTML = () => {
    const elements = canvasElements
      .map((el) => {
        const style = `position: absolute; left: ${el.x}px; top: ${el.y}px;`

        switch (el.type) {
          case "heading":
            return `<${el.props.level} style="${style} color: ${el.props.color}; font-size: ${el.props.fontSize};">${el.props.text}</${el.props.level}>`
          case "paragraph":
            return `<p style="${style} color: ${el.props.color}; font-size: ${el.props.fontSize};">${el.props.text}</p>`
          case "button":
            return `<button style="${style} background-color: ${el.props.backgroundColor}; color: ${el.props.color}; padding: ${el.props.padding}; border: none; border-radius: 4px; cursor: pointer;">${el.props.text}</button>`
          case "image":
            return `<img src="${el.props.src}" alt="${el.props.alt}" style="${style} width: ${el.props.width}; height: ${el.props.height};" />`
          case "container":
            return `<div style="${style} background-color: ${el.props.backgroundColor}; padding: ${el.props.padding}; border-radius: ${el.props.borderRadius}; min-height: ${el.props.minHeight};"></div>`
          case "input":
            return `<input type="${el.props.type}" placeholder="${el.props.placeholder}" style="${style} padding: ${el.props.padding}; border: ${el.props.border}; border-radius: 4px;" />`
          case "list":
            const listItems = el.props.items.map((item) => `<li>${item}</li>`).join("")
            return `<${el.props.listType} style="${style} color: ${el.props.color};">${listItems}</${el.props.listType}>`
          case "link":
            return `<a href="${el.props.href}" style="${style} color: ${el.props.color}; text-decoration: ${el.props.textDecoration};">${el.props.text}</a>`
          default:
            return ""
        }
      })
      .join("\n")

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Summer Camp Creation</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; position: relative; min-height: 100vh;">
${elements}
</body>
</html>`
  }

  // Generate CSS code
  const generateCSS = () => {
    return `/* Summer Camp Creation Styles */
body {
    margin: 0;
    padding: 20px;
    font-family: Arial, sans-serif;
    position: relative;
    min-height: 100vh;
}

/* Add your custom styles here */
.container {
    max-width: 1200px;
    margin: 0 auto;
}

/* Responsive styles */
@media (max-width: 768px) {
    body {
        padding: 10px;
    }
}

@media (max-width: 480px) {
    body {
        padding: 5px;
    }
}`
  }

  // Render element on canvas
  const renderElement = (element) => {
    const commonStyle = {
      position: "absolute",
      left: element.x,
      top: element.y,
      cursor: "move",
      border: selectedElement?.id === element.id ? "2px solid #007bff" : "1px solid transparent",
      borderRadius: "2px",
    }

    const handleMouseDown = (e) => {
      e.preventDefault()
      setSelectedElement(element)

      const startX = e.clientX - element.x
      const startY = e.clientY - element.y

      const handleMouseMove = (e) => {
        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        const newX = Math.max(0, Math.min(e.clientX - startX, rect.width - 100))
        const newY = Math.max(0, Math.min(e.clientY - startY, rect.height - 50))
        updateElementPosition(element.id, newX, newY)
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    switch (element.type) {
      case "heading":
        const HeadingTag = element.props.level
        return (
          <HeadingTag
            key={element.id}
            style={{
              ...commonStyle,
              color: element.props.color,
              fontSize: element.props.fontSize,
              margin: 0,
            }}
            onMouseDown={handleMouseDown}
            onClick={() => handleElementClick(element)}
          >
            {element.props.text}
          </HeadingTag>
        )
      case "paragraph":
        return (
          <p
            key={element.id}
            style={{
              ...commonStyle,
              color: element.props.color,
              fontSize: element.props.fontSize,
              margin: 0,
            }}
            onMouseDown={handleMouseDown}
            onClick={() => handleElementClick(element)}
          >
            {element.props.text}
          </p>
        )
      case "button":
        return (
          <button
            key={element.id}
            style={{
              ...commonStyle,
              backgroundColor: element.props.backgroundColor,
              color: element.props.color,
              padding: element.props.padding,
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseDown={handleMouseDown}
            onClick={() => handleElementClick(element)}
          >
            {element.props.text}
          </button>
        )
      case "image":
        return (
          <img
            key={element.id}
            src={element.props.src || "/placeholder.svg"}
            alt={element.props.alt}
            style={{
              ...commonStyle,
              width: element.props.width,
              height: element.props.height,
            }}
            onMouseDown={handleMouseDown}
            onClick={() => handleElementClick(element)}
          />
        )
      case "container":
        return (
          <div
            key={element.id}
            style={{
              ...commonStyle,
              backgroundColor: element.props.backgroundColor,
              padding: element.props.padding,
              borderRadius: element.props.borderRadius,
              minHeight: element.props.minHeight,
              minWidth: "100px",
            }}
            onMouseDown={handleMouseDown}
            onClick={() => handleElementClick(element)}
          >
            <span style={{ color: "#999", fontSize: "12px" }}>Container</span>
          </div>
        )
      case "input":
        return (
          <input
            key={element.id}
            type={element.props.type}
            placeholder={element.props.placeholder}
            style={{
              ...commonStyle,
              padding: element.props.padding,
              border: element.props.border,
              borderRadius: "4px",
            }}
            onMouseDown={handleMouseDown}
            onClick={() => handleElementClick(element)}
          />
        )
      case "list":
        const ListTag = element.props.listType
        return (
          <ListTag
            key={element.id}
            style={{
              ...commonStyle,
              color: element.props.color,
              margin: 0,
              paddingLeft: "20px",
            }}
            onMouseDown={handleMouseDown}
            onClick={() => handleElementClick(element)}
          >
            {element.props.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ListTag>
        )
      case "link":
        return (
          <a
            key={element.id}
            href={element.props.href}
            style={{
              ...commonStyle,
              color: element.props.color,
              textDecoration: element.props.textDecoration,
            }}
            onMouseDown={handleMouseDown}
            onClick={(e) => {
              e.preventDefault()
              handleElementClick(element)
            }}
          >
            {element.props.text}
          </a>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <span className="text-white text-lg font-bold">🎨</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Interactive Web Builder</h1>
                <p className="text-gray-600 text-sm">Drag, drop, and create your webpage!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Viewport Selector */}
              <select
                value={viewportWidth}
                onChange={(e) => setViewportWidth(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                {Object.entries(viewports).map(([key, viewport]) => (
                  <option key={key} value={key}>
                    {viewport.label}
                  </option>
                ))}
              </select>
              {/* Code Toggle */}
              <button
                onClick={() => setShowCode(!showCode)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                {showCode ? "Hide Code" : "Show Code"}
              </button>
              {/* Clear Canvas */}
              <button
                onClick={() => {
                  setCanvasElements([])
                  setSelectedElement(null)
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Elements Palette */}
        <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <h3 className="font-semibold text-gray-900 mb-4">HTML Elements</h3>
          <div className="space-y-2">
            {htmlElements.map((element) => (
              <div
                key={element.type}
                draggable
                onDragStart={(e) => handleDragStart(e, element)}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg">{element.icon}</span>
                <span className="text-sm font-medium text-gray-700">{element.label}</span>
              </div>
            ))}
          </div>

          {/* Properties Panel */}
          {selectedElement && (
            <div className="mt-8">
              <h3 className="font-semibold text-gray-900 mb-4">Properties</h3>
              <div className="space-y-3">
                {Object.entries(selectedElement.props).map(([key, value]) => {
                  if (key === "items") {
                    return (
                      <div key={key}>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          List Items (comma separated)
                        </label>
                        <input
                          type="text"
                          value={value.join(", ")}
                          onChange={(e) => updateElementProperty(selectedElement.id, key, e.target.value.split(", "))}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                        />
                      </div>
                    )
                  }
                  return (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      <input
                        type={key.includes("color") ? "color" : "text"}
                        value={value}
                        onChange={(e) => updateElementProperty(selectedElement.id, key, e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                      />
                    </div>
                  )
                })}
                <button
                  onClick={() => deleteElement(selectedElement.id)}
                  className="w-full bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                >
                  Delete Element
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Canvas */}
          <div className="flex-1 p-4">
            <div
              className="mx-auto bg-white border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
              style={{
                width: viewports[viewportWidth].width,
                height: "600px",
                maxWidth: "100%",
              }}
            >
              <div
                ref={canvasRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="relative w-full h-full"
                style={{ minHeight: "600px" }}
              >
                {canvasElements.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <span className="text-4xl mb-2 block">🎨</span>
                      <p>Drag elements here to start building!</p>
                    </div>
                  </div>
                )}
                {canvasElements.map(renderElement)}
              </div>
            </div>
          </div>

          {/* Code Panel */}
          {showCode && (
            <div className="h-80 bg-gray-900 text-white p-4 overflow-auto">
              <div className="flex space-x-4 mb-4">
                <button className="text-orange-400 font-semibold">HTML</button>
                <button className="text-blue-400 font-semibold">CSS</button>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">HTML Code:</h4>
                  <pre className="text-sm bg-gray-800 p-3 rounded overflow-x-auto">
                    <code>{generateHTML()}</code>
                  </pre>
                </div>
                <div>
                  <h4 className="text-blue-400 font-semibold mb-2">CSS Code:</h4>
                  <pre className="text-sm bg-gray-800 p-3 rounded overflow-x-auto">
                    <code>{generateCSS()}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
