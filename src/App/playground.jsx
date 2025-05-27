"use client"

import { useState, useRef, useCallback } from "react"

export default function EnhancedInteractivePlayground() {
  const [canvasElements, setCanvasElements] = useState([])
  const [selectedElement, setSelectedElement] = useState(null)
  const [viewportWidth, setViewportWidth] = useState("desktop")
  const [showCodeModal, setShowCodeModal] = useState(false)
  const [draggedElement, setDraggedElement] = useState(null)
  const [inputValues, setInputValues] = useState({})
  const [canvasHeight, setCanvasHeight] = useState(700)
  const [canvasBackground, setCanvasBackground] = useState("#ffffff")
  const [activeTab, setActiveTab] = useState("elements")
  const canvasRef = useRef(null)

  // Design presets
  const designPresets = [
    {
      name: "Single Page Layout",
      icon: "📄",
      elements: [
        {
          type: "navbar",
          x: 0,
          y: 0,
          props: {
            backgroundColor: "#2563eb",
            height: "60px",
            width: "100%",
            items: ["Home", "About", "Services", "Contact"],
            textColor: "#ffffff",
            fontSize: "16px",
            padding: "0 20px",
          },
        },
        {
          type: "heading",
          x: 50,
          y: 100,
          props: {
            text: "Welcome to My Website",
            level: "h1",
            color: "#1f2937",
            fontSize: "48px",
            fontWeight: "bold",
            textAlign: "center",
          },
        },
        {
          type: "paragraph",
          x: 50,
          y: 180,
          props: {
            text: "This is a beautiful single page layout perfect for showcasing your content.",
            color: "#6b7280",
            fontSize: "18px",
            textAlign: "center",
            lineHeight: "1.6",
          },
        },
      ],
    },
    {
      name: "Split Screen Layout",
      icon: "⚡",
      elements: [
        {
          type: "container",
          x: 0,
          y: 0,
          props: {
            backgroundColor: "#f3f4f6",
            padding: "40px",
            borderRadius: "0px",
            minHeight: "400px",
            width: "50%",
            border: "none",
          },
        },
        {
          type: "container",
          x: 400,
          y: 0,
          props: {
            backgroundColor: "#1f2937",
            padding: "40px",
            borderRadius: "0px",
            minHeight: "400px",
            width: "50%",
            border: "none",
          },
        },
        {
          type: "heading",
          x: 50,
          y: 50,
          props: {
            text: "Left Side",
            level: "h2",
            color: "#1f2937",
            fontSize: "32px",
            fontWeight: "bold",
            textAlign: "left",
          },
        },
        {
          type: "heading",
          x: 450,
          y: 50,
          props: {
            text: "Right Side",
            level: "h2",
            color: "#ffffff",
            fontSize: "32px",
            fontWeight: "bold",
            textAlign: "left",
          },
        },
      ],
    },
    {
      name: "Grid Layout",
      icon: "⚏",
      elements: [
        {
          type: "heading",
          x: 200,
          y: 20,
          props: {
            text: "Grid Layout",
            level: "h1",
            color: "#1f2937",
            fontSize: "36px",
            fontWeight: "bold",
            textAlign: "center",
          },
        },
        {
          type: "card",
          x: 50,
          y: 100,
          props: {
            title: "Card 1",
            content: "First grid item",
            backgroundColor: "#dbeafe",
            borderColor: "#3b82f6",
            width: "200px",
            height: "150px",
          },
        },
        {
          type: "card",
          x: 300,
          y: 100,
          props: {
            title: "Card 2",
            content: "Second grid item",
            backgroundColor: "#dcfce7",
            borderColor: "#22c55e",
            width: "200px",
            height: "150px",
          },
        },
        {
          type: "card",
          x: 550,
          y: 100,
          props: {
            title: "Card 3",
            content: "Third grid item",
            backgroundColor: "#fef3c7",
            borderColor: "#f59e0b",
            width: "200px",
            height: "150px",
          },
        },
      ],
    },
    {
      name: "Hero Image Layout",
      icon: "🖼️",
      elements: [
        {
          type: "hero",
          x: 0,
          y: 0,
          props: {
            backgroundImage: "/placeholder.svg?height=400&width=800",
            height: "400px",
            width: "100%",
            overlayColor: "rgba(0,0,0,0.4)",
          },
        },
        {
          type: "heading",
          x: 200,
          y: 150,
          props: {
            text: "Hero Title",
            level: "h1",
            color: "#ffffff",
            fontSize: "48px",
            fontWeight: "bold",
            textAlign: "center",
          },
        },
        {
          type: "button",
          x: 300,
          y: 220,
          props: {
            text: "Get Started",
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            padding: "15px 30px",
            borderRadius: "8px",
            fontSize: "18px",
            fontWeight: "bold",
          },
        },
      ],
    },
  ]

  // Enhanced HTML elements with new additions
  const htmlElements = [
    {
      type: "heading",
      label: "Heading",
      icon: "📝",
      defaultProps: {
        text: "My Heading",
        level: "h1",
        color: "#000000",
        fontSize: "32px",
        fontWeight: "bold",
        textAlign: "left",
      },
    },
    {
      type: "paragraph",
      label: "Paragraph",
      icon: "📄",
      defaultProps: {
        text: "This is my paragraph text. I can write anything here!",
        color: "#333333",
        fontSize: "16px",
        textAlign: "left",
        lineHeight: "1.5",
      },
    },
    {
      type: "button",
      label: "Button",
      icon: "🔘",
      defaultProps: {
        text: "Click Me!",
        backgroundColor: "#007bff",
        color: "#ffffff",
        padding: "12px 24px",
        borderRadius: "6px",
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    {
      type: "image",
      label: "Image",
      icon: "🖼️",
      defaultProps: {
        src: "/placeholder.svg?height=200&width=300",
        alt: "My Image",
        width: "300px",
        height: "200px",
        borderRadius: "8px",
      },
    },
    {
      type: "container",
      label: "Container",
      icon: "📦",
      defaultProps: {
        backgroundColor: "#f8f9fa",
        padding: "20px",
        borderRadius: "8px",
        minHeight: "100px",
        width: "300px",
        border: "2px solid #e9ecef",
      },
    },
    {
      type: "input",
      label: "Input Field",
      icon: "✏️",
      defaultProps: {
        placeholder: "Type here...",
        type: "text",
        padding: "10px 15px",
        border: "2px solid #ccc",
        borderRadius: "6px",
        fontSize: "16px",
        width: "250px",
      },
    },
    {
      type: "list",
      label: "List",
      icon: "📋",
      defaultProps: {
        items: ["First item", "Second item", "Third item"],
        listType: "ul",
        color: "#333333",
        fontSize: "16px",
        lineHeight: "1.6",
      },
    },
    {
      type: "link",
      label: "Link",
      icon: "🔗",
      defaultProps: {
        text: "Click this link",
        href: "#",
        color: "#007bff",
        textDecoration: "underline",
        fontSize: "16px",
        fontWeight: "normal",
      },
    },
    {
      type: "navbar",
      label: "Navigation Bar",
      icon: "🧭",
      defaultProps: {
        backgroundColor: "#2563eb",
        height: "60px",
        width: "100%",
        items: ["Home", "About", "Services", "Contact"],
        textColor: "#ffffff",
        fontSize: "16px",
        padding: "0 20px",
      },
    },
    {
      type: "card",
      label: "Card",
      icon: "🃏",
      defaultProps: {
        title: "Card Title",
        content: "Card content goes here",
        backgroundColor: "#ffffff",
        borderColor: "#e5e7eb",
        width: "250px",
        height: "200px",
        borderRadius: "8px",
        padding: "20px",
      },
    },
    {
      type: "hero",
      label: "Hero Section",
      icon: "🌟",
      defaultProps: {
        backgroundImage: "/placeholder.svg?height=300&width=600",
        height: "300px",
        width: "100%",
        overlayColor: "rgba(0,0,0,0.3)",
      },
    },
    {
      type: "footer",
      label: "Footer",
      icon: "🦶",
      defaultProps: {
        backgroundColor: "#1f2937",
        textColor: "#ffffff",
        height: "80px",
        width: "100%",
        text: "© 2024 My Website. All rights reserved.",
        fontSize: "14px",
        textAlign: "center",
      },
    },
  ]

  // Viewport sizes for responsive testing
  const viewports = {
    mobile: { width: "375px", label: "📱 Mobile (375px)" },
    tablet: { width: "768px", label: "📱 Tablet (768px)" },
    desktop: { width: "100%", label: "💻 Desktop (100%)" },
  }

  // Apply design preset
  const applyPreset = (preset) => {
    const newElements = preset.elements.map((el) => ({
      id: Date.now() + Math.random(),
      type: el.type,
      x: el.x,
      y: el.y,
      props: { ...el.props },
    }))
    setCanvasElements(newElements)
    setSelectedElement(null)
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

  // Handle input value change
  const handleInputChange = (elementId, value) => {
    setInputValues((prev) => ({ ...prev, [elementId]: value }))
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
    setInputValues((prev) => {
      const newValues = { ...prev }
      delete newValues[elementId]
      return newValues
    })
  }

  // Duplicate element
  const duplicateElement = (elementId) => {
    const elementToDuplicate = canvasElements.find((el) => el.id === elementId)
    if (elementToDuplicate) {
      const newElement = {
        ...elementToDuplicate,
        id: Date.now() + Math.random(),
        x: elementToDuplicate.x + 20,
        y: elementToDuplicate.y + 20,
      }
      setCanvasElements((prev) => [...prev, newElement])
    }
  }

  // Generate HTML code
  const generateHTML = () => {
    const elements = canvasElements
      .map((el) => {
        const style = `position: absolute; left: ${el.x}px; top: ${el.y}px;`

        switch (el.type) {
          case "heading":
            return `<${el.props.level} style="${style} color: ${el.props.color}; font-size: ${el.props.fontSize}; font-weight: ${el.props.fontWeight}; text-align: ${el.props.textAlign};">${el.props.text}</${el.props.level}>`
          case "paragraph":
            return `<p style="${style} color: ${el.props.color}; font-size: ${el.props.fontSize}; text-align: ${el.props.textAlign}; line-height: ${el.props.lineHeight};">${el.props.text}</p>`
          case "button":
            return `<button style="${style} background-color: ${el.props.backgroundColor}; color: ${el.props.color}; padding: ${el.props.padding}; border: none; border-radius: ${el.props.borderRadius}; cursor: pointer; font-size: ${el.props.fontSize}; font-weight: ${el.props.fontWeight};">${el.props.text}</button>`
          case "image":
            return `<img src="${el.props.src}" alt="${el.props.alt}" style="${style} width: ${el.props.width}; height: ${el.props.height}; border-radius: ${el.props.borderRadius};" />`
          case "container":
            return `<div style="${style} background-color: ${el.props.backgroundColor}; padding: ${el.props.padding}; border-radius: ${el.props.borderRadius}; min-height: ${el.props.minHeight}; width: ${el.props.width}; border: ${el.props.border};"></div>`
          case "input":
            return `<input type="${el.props.type}" placeholder="${el.props.placeholder}" style="${style} padding: ${el.props.padding}; border: ${el.props.border}; border-radius: ${el.props.borderRadius}; font-size: ${el.props.fontSize}; width: ${el.props.width};" />`
          case "list":
            const listItems = el.props.items.map((item) => `<li>${item}</li>`).join("")
            return `<${el.props.listType} style="${style} color: ${el.props.color}; font-size: ${el.props.fontSize}; line-height: ${el.props.lineHeight}; padding-left: 20px;">${listItems}</${el.props.listType}>`
          case "link":
            return `<a href="${el.props.href}" style="${style} color: ${el.props.color}; text-decoration: ${el.props.textDecoration}; font-size: ${el.props.fontSize}; font-weight: ${el.props.fontWeight};">${el.props.text}</a>`
          case "navbar":
            const navItems = el.props.items
              .map(
                (item) =>
                  `<a href="#" style="color: ${el.props.textColor}; text-decoration: none; margin-right: 20px;">${item}</a>`,
              )
              .join("")
            return `<nav style="${style} background-color: ${el.props.backgroundColor}; height: ${el.props.height}; width: ${el.props.width}; display: flex; align-items: center; padding: ${el.props.padding}; font-size: ${el.props.fontSize};">${navItems}</nav>`
          case "card":
            return `<div style="${style} background-color: ${el.props.backgroundColor}; border: 2px solid ${el.props.borderColor}; border-radius: ${el.props.borderRadius}; width: ${el.props.width}; height: ${el.props.height}; padding: ${el.props.padding};"><h3 style="margin: 0 0 10px 0;">${el.props.title}</h3><p style="margin: 0;">${el.props.content}</p></div>`
          case "hero":
            return `<div style="${style} background-image: url('${el.props.backgroundImage}'); background-size: cover; background-position: center; height: ${el.props.height}; width: ${el.props.width}; position: relative;"><div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: ${el.props.overlayColor};"></div></div>`
          case "footer":
            return `<footer style="${style} background-color: ${el.props.backgroundColor}; color: ${el.props.textColor}; height: ${el.props.height}; width: ${el.props.width}; display: flex; align-items: center; justify-content: center; font-size: ${el.props.fontSize}; text-align: ${el.props.textAlign};">${el.props.text}</footer>`
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
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            position: relative;
            min-height: 100vh;
            background-color: ${canvasBackground};
        }
    </style>
</head>
<body>
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
    background-color: ${canvasBackground};
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

/* Button hover effects */
button:hover {
    opacity: 0.9;
    transform: translateY(-1px);
}

/* Link hover effects */
a:hover {
    opacity: 0.8;
}

/* List styles */
ul, ol {
    padding-left: 20px;
}

ul li {
    list-style-type: disc;
}

ol li {
    list-style-type: decimal;
}

/* Card styles */
.card {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-2px);
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
      border: selectedElement?.id === element.id ? "3px solid #007bff" : "2px solid transparent",
      borderRadius: "4px",
      boxShadow: selectedElement?.id === element.id ? "0 0 10px rgba(0,123,255,0.3)" : "none",
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
              fontWeight: element.props.fontWeight,
              textAlign: element.props.textAlign,
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
              textAlign: element.props.textAlign,
              lineHeight: element.props.lineHeight,
              margin: 0,
              maxWidth: "400px",
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
              borderRadius: element.props.borderRadius,
              cursor: "pointer",
              fontSize: element.props.fontSize,
              fontWeight: element.props.fontWeight,
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
              borderRadius: element.props.borderRadius,
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
              width: element.props.width,
              border: element.props.border,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseDown={handleMouseDown}
            onClick={() => handleElementClick(element)}
          >
            <span style={{ color: "#999", fontSize: "14px", fontWeight: "bold" }}>📦 Container</span>
          </div>
        )
      case "input":
        return (
          <input
            key={element.id}
            type={element.props.type}
            placeholder={element.props.placeholder}
            value={inputValues[element.id] || ""}
            onChange={(e) => handleInputChange(element.id, e.target.value)}
            style={{
              ...commonStyle,
              padding: element.props.padding,
              border: element.props.border,
              borderRadius: element.props.borderRadius,
              fontSize: element.props.fontSize,
              width: element.props.width,
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
              fontSize: element.props.fontSize,
              lineHeight: element.props.lineHeight,
              margin: 0,
              paddingLeft: "20px",
              listStylePosition: "inside",
            }}
            onMouseDown={handleMouseDown}
            onClick={() => handleElementClick(element)}
          >
            {element.props.items.map((item, index) => (
              <li
                key={index}
                style={{
                  listStyleType: element.props.listType === "ul" ? "disc" : "decimal",
                  marginBottom: "4px",
                }}
              >
                {item}
              </li>
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
              fontSize: element.props.fontSize,
              fontWeight: element.props.fontWeight,
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
      case "navbar":
        return (
          <nav
            key={element.id}
            style={{
              ...commonStyle,
              backgroundColor: element.props.backgroundColor,
              height: element.props.height,
              width: element.props.width,
              display: "flex",
              alignItems: "center",
              padding: element.props.padding,
              fontSize: element.props.fontSize,
            }}
            onMouseDown={handleMouseDown}
            onClick={() => handleElementClick(element)}
          >
            {element.props.items.map((item, index) => (
              <a
                key={index}
                href="#"
                style={{
                  color: element.props.textColor,
                  textDecoration: "none",
                  marginRight: "20px",
                  fontSize: element.props.fontSize,
                }}
                onClick={(e) => e.preventDefault()}
              >
                {item}
              </a>
            ))}
          </nav>
        )
      case "card":
        return (
          <div
            key={element.id}
            style={{
              ...commonStyle,
              backgroundColor: element.props.backgroundColor,
              border: `2px solid ${element.props.borderColor}`,
              borderRadius: element.props.borderRadius,
              width: element.props.width,
              height: element.props.height,
              padding: element.props.padding,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            onMouseDown={handleMouseDown}
            onClick={() => handleElementClick(element)}
          >
            <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", fontWeight: "bold" }}>{element.props.title}</h3>
            <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>{element.props.content}</p>
          </div>
        )
      case "hero":
        return (
          <div
            key={element.id}
            style={{
              ...commonStyle,
              backgroundImage: `url('${element.props.backgroundImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: element.props.height,
              width: element.props.width,
              position: "relative",
            }}
            onMouseDown={handleMouseDown}
            onClick={() => handleElementClick(element)}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: element.props.overlayColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              🌟 Hero Section
            </div>
          </div>
        )
      case "footer":
        return (
          <footer
            key={element.id}
            style={{
              ...commonStyle,
              backgroundColor: element.props.backgroundColor,
              color: element.props.textColor,
              height: element.props.height,
              width: element.props.width,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: element.props.fontSize,
              textAlign: element.props.textAlign,
            }}
            onMouseDown={handleMouseDown}
            onClick={() => handleElementClick(element)}
          >
            {element.props.text}
          </footer>
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
                <h1 className="text-xl font-bold text-gray-900">Enhanced Web Builder</h1>
                <p className="text-gray-600 text-sm">Create amazing websites with presets and templates!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Canvas Height Control */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Height:</label>
                <input
                  type="range"
                  min="400"
                  max="2000"
                  step="50"
                  value={canvasHeight}
                  onChange={(e) => setCanvasHeight(Number.parseInt(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm text-gray-600 w-12">{canvasHeight}px</span>
              </div>

              {/* Background Color Control */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Background:</label>
                <input
                  type="color"
                  value={canvasBackground}
                  onChange={(e) => setCanvasBackground(e.target.value)}
                  className="w-8 h-8 rounded border"
                />
              </div>

              {/* Viewport Selector */}
              <select
                value={viewportWidth}
                onChange={(e) => setViewportWidth(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
              >
                {Object.entries(viewports).map(([key, viewport]) => (
                  <option key={key} value={key}>
                    {viewport.label}
                  </option>
                ))}
              </select>

              {/* Code Toggle */}
              <button
                onClick={() => setShowCodeModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                📄 View Code
              </button>

              {/* Clear Canvas */}
              <button
                onClick={() => {
                  setCanvasElements([])
                  setSelectedElement(null)
                  setInputValues({})
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-medium"
              >
                🗑️ Clear All
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Enhanced Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("presets")}
              className={`flex-1 py-3 px-4 text-sm font-medium ${
                activeTab === "presets"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🎨 Presets
            </button>
            <button
              onClick={() => setActiveTab("elements")}
              className={`flex-1 py-3 px-4 text-sm font-medium ${
                activeTab === "elements"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🧩 Elements
            </button>
          </div>

          <div className="p-4">
            {/* Design Presets Tab */}
            {activeTab === "presets" && (
              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg">🎨 Design Presets</h3>
                <div className="space-y-3">
                  {designPresets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => applyPreset(preset)}
                      className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all duration-200 border-2 border-transparent hover:border-purple-200"
                    >
                      <span className="text-2xl">{preset.icon}</span>
                      <span className="text-sm font-semibold text-gray-700">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Elements Tab */}
            {activeTab === "elements" && (
              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg">🧩 HTML Elements</h3>
                <div className="space-y-3">
                  {htmlElements.map((element) => (
                    <div
                      key={element.type}
                      draggable
                      onDragStart={(e) => handleDragStart(e, element)}
                      className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg cursor-move hover:from-blue-100 hover:to-purple-100 transition-all duration-200 border-2 border-transparent hover:border-blue-200"
                    >
                      <span className="text-2xl">{element.icon}</span>
                      <span className="text-sm font-semibold text-gray-700">{element.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Properties Panel */}
            {selectedElement && (
              <div className="mt-8 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">⚙️ Properties</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => duplicateElement(selectedElement.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 font-medium"
                    >
                      📋 Copy
                    </button>
                    <button
                      onClick={() => deleteElement(selectedElement.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 font-medium"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {Object.entries(selectedElement.props).map(([key, value]) => {
                    if (key === "items") {
                      return (
                        <div key={key}>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            📝 List Items (one per line)
                          </label>
                          <textarea
                            value={value.join("\n")}
                            onChange={(e) =>
                              updateElementProperty(
                                selectedElement.id,
                                key,
                                e.target.value.split("\n").filter((item) => item.trim()),
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            rows="3"
                          />
                        </div>
                      )
                    }
                    if (key === "level") {
                      return (
                        <div key={key}>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">📏 Heading Level</label>
                          <select
                            value={value}
                            onChange={(e) => updateElementProperty(selectedElement.id, key, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          >
                            <option value="h1">H1 (Largest)</option>
                            <option value="h2">H2 (Large)</option>
                            <option value="h3">H3 (Medium)</option>
                            <option value="h4">H4 (Small)</option>
                            <option value="h5">H5 (Smaller)</option>
                            <option value="h6">H6 (Smallest)</option>
                          </select>
                        </div>
                      )
                    }
                    if (key === "listType") {
                      return (
                        <div key={key}>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">📋 List Type</label>
                          <select
                            value={value}
                            onChange={(e) => updateElementProperty(selectedElement.id, key, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          >
                            <option value="ul">• Bullet List</option>
                            <option value="ol">1. Numbered List</option>
                          </select>
                        </div>
                      )
                    }
                    if (key === "textAlign") {
                      return (
                        <div key={key}>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">📐 Text Alignment</label>
                          <select
                            value={value}
                            onChange={(e) => updateElementProperty(selectedElement.id, key, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          >
                            <option value="left">⬅️ Left</option>
                            <option value="center">⬆️ Center</option>
                            <option value="right">➡️ Right</option>
                          </select>
                        </div>
                      )
                    }
                    return (
                      <div key={key}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {key.includes("color") ? "🎨" : key.includes("size") ? "📏" : "✏️"}{" "}
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                        </label>
                        {key.includes("text") && key !== "textAlign" && key !== "textDecoration" ? (
                          <textarea
                            value={value}
                            onChange={(e) => updateElementProperty(selectedElement.id, key, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            rows="2"
                          />
                        ) : (
                          <input
                            type={key.includes("color") ? "color" : "text"}
                            value={value}
                            onChange={(e) => updateElementProperty(selectedElement.id, key, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Canvas */}
          <div className="flex-1 p-6">
            <div
              className="mx-auto border-4 border-dashed border-blue-300 rounded-xl overflow-hidden shadow-lg"
              style={{
                width: viewports[viewportWidth].width,
                height: `${canvasHeight}px`,
                maxWidth: "100%",
                backgroundColor: canvasBackground,
              }}
            >
              <div
                ref={canvasRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="relative w-full h-full"
                style={{
                  minHeight: `${canvasHeight}px`,
                  backgroundColor: canvasBackground,
                }}
              >
                {canvasElements.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <span className="text-6xl mb-4 block">🎨</span>
                      <p className="text-xl font-semibold">Start with a preset or drag elements here!</p>
                      <p className="text-sm mt-2">Choose from presets or individual elements</p>
                    </div>
                  </div>
                )}
                {canvasElements.map(renderElement)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">📄 Your Generated Code</h3>
              <button
                onClick={() => setShowCodeModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-orange-600">🟧 HTML Code</h4>
                    <button
                      onClick={() => navigator.clipboard.writeText(generateHTML())}
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 text-sm font-medium"
                    >
                      📋 Copy HTML
                    </button>
                  </div>
                  <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto border">
                    <code>{generateHTML()}</code>
                  </pre>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-blue-600">🟦 CSS Code</h4>
                    <button
                      onClick={() => navigator.clipboard.writeText(generateCSS())}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                    >
                      📋 Copy CSS
                    </button>
                  </div>
                  <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto border">
                    <code>{generateCSS()}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
