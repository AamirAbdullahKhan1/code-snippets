"use client"

import { useState } from "react"

export default function CodeSnippetsPage() {
  const [activeTab, setActiveTab] = useState("javascript")
  const [copiedSnippet, setCopiedSnippet] = useState(null)

  const codeSnippets = {
    javascript: [
      {
        id: 1,
        title: "Hello World Function",
        description: "A simple function to display a greeting message",
        difficulty: "Beginner",
        code: `function sayHello(name) {
  console.log("Hello, " + name + "!");
  return "Hello, " + name + "!";
}

// Usage
sayHello("Summer Camper");`,
      },
      {
        id: 2,
        title: "Array Methods Practice",
        description: "Common array methods every student should know",
        difficulty: "Intermediate",
        code: `const fruits = ['apple', 'banana', 'orange', 'grape'];

// Add items
fruits.push('mango');
fruits.unshift('strawberry');

// Remove items
const lastFruit = fruits.pop();
const firstFruit = fruits.shift();

// Find items
const hasApple = fruits.includes('apple');
const appleIndex = fruits.indexOf('apple');

// Transform array
const upperFruits = fruits.map(fruit => fruit.toUpperCase());
const longFruits = fruits.filter(fruit => fruit.length > 5);

console.log(fruits);`,
      },
      {
        id: 3,
        title: "Simple Calculator",
        description: "Basic calculator with four operations",
        difficulty: "Intermediate",
        code: `class Calculator {
  add(a, b) {
    return a + b;
  }
  
  subtract(a, b) {
    return a - b;
  }
  
  multiply(a, b) {
    return a * b;
  }
  
  divide(a, b) {
    if (b === 0) {
      return "Cannot divide by zero!";
    }
    return a / b;
  }
}

// Usage
const calc = new Calculator();
console.log(calc.add(5, 3)); // 8
console.log(calc.multiply(4, 7)); // 28`,
      },
      {
        id: 4,
        title: "For Loop Examples",
        description: "Different ways to use for loops",
        difficulty: "Beginner",
        code: `// Basic for loop
for (let i = 0; i < 5; i++) {
  console.log("Count: " + i);
}

// For...of loop (arrays)
const colors = ['red', 'green', 'blue'];
for (const color of colors) {
  console.log("Color: " + color);
}

// For...in loop (objects)
const person = {name: 'Alice', age: 16, grade: '10th'};
for (const key in person) {
  console.log(key + ": " + person[key]);
}`,
      },
    ],
    html: [
      {
        id: 5,
        title: "Basic HTML Structure",
        description: "Essential HTML template for any webpage",
        difficulty: "Beginner",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Webpage</title>
    
</head>
<body>
    <h1>Welcome to [Your Name]'s Webpage</h1>
    <img src="profile.jpg" alt="Your Picture">
    <p>Hi! My name is [Your Name]. This is a small introduction about me.</p>
    <div class="hobbies">
        <h2>My Hobbies</h2>
        <ul>
            <li>[Hobby 1]</li>
            <li>[Hobby 2]</li>
            <li>[Hobby 3]</li>
        </ul>
    </div>
</body>
</html>`,
      },
      {
        id: 6,
        title: "Portfolio Page",
        description: "Simple portfolio page with navlinks",
        difficulty: "Intermediate",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personal Portfolio</title>
    
</head>
<body>

    <!-- Navigation Bar -->
    <nav>
        <div>My Portfolio</div>
        <div>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <h1>Welcome to My Portfolio</h1>
        <p>Hi! I'm [Your Name], a budding web developer passionate about design and coding.</p>
    </section>

    <!-- Cards Section -->
    <section class="cards">
        <div class="card">
            <img src="side content.png" alt="Project 1">
            <h3>Project 1</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quis minima in, rem distinctio quisquam rerum totam quam consectetur, sunt adipisci iusto beatae amet, delectus similique facilis asperiores ad illum.</p>
        </div>
        <div class="card">
            <img src="side content.png" alt="Project 2">
            <h3>Project 2</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium eum inventore accusantium voluptatem. Temporibus commodi reprehenderit nam eos ratione magnam dicta reiciendis provident, maiores tempora. In beatae repellendus aspernatur nesciunt!</p>
        </div>
        <div class="card">
            <img src="side content.png" alt="Project 3">
            <h3>Project 3</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur facilis itaque, minus, officiis totam ipsum harum, tempore magni fugiat et nobis reprehenderit exercitationem temporibus a fuga. Cupiditate reprehenderit reiciendis aliquam!</p>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        &copy; 2025 [Your Name]. All Rights Reserved.
    </footer>

</body>
</html>`,
      },
      
    ],
    css: [
      {
        id: 8,
        title: "Simple Layout",
        description: "A very basic CSS layout",
        difficulty: "Beginner",
        code: `
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f9f9f9;
            color: #333;
        }
        h1 {
            color: #007BFF;
        }
        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin: 10px auto;
        }
        .hobbies {
            margin: 20px 0;
        }
        .hobbies li {
            list-style: none;
            padding: 5px;
            background-color: #007BFF;
            color: white;
            margin: 5px;
            display: inline-block;
            border-radius: 5px;
        }`,
      },
      {
        id: 9,
        title: "Proper Layout",
        description: "CSS Layout for the portfolio page",
        difficulty: "Intermediate",
        code: `body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
            color: #333;
        }
        nav {
            background-color: #007BFF;
            padding: 1em;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;
        }
        nav a {
            color: white;
            text-decoration: none;
            margin: 0 1em;
        }
        .hero {
            text-align: center;
            padding: 50px 20px;
            background-color: #e9ecef;
        }
        .hero h1 {
            color: #007BFF;
            font-size: 3rem;
            margin-bottom: 10px;
        }
        .hero p {
            font-size: 1.2rem;
            color: #555;
        }
        .cards {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            padding: 20px;
        }
        .card {
            background-color: white;
            width: 300px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            text-align: center;
            transition: transform 0.3s;
        }
        .card:hover {
            transform: scale(1.05);
        }
        .card img {
            width: 100%;
            border-radius: 8px;
        }
        .card h3 {
            margin: 10px 0;
            color: #007BFF;
        }
        .card p {
            font-size: 1rem;
            color: #555;
        }
        footer {
            text-align: center;
            padding: 10px 20px;
            background-color: #007BFF;
            color: white;

        }`,
      },
      
    ],
    
  }

  const copyToClipboard = async (code, snippetId) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedSnippet(snippetId)
      setTimeout(() => setCopiedSnippet(null), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const tabs = [
    { id: "javascript", label: "JavaScript", icon: "🟨" },
    { id: "html", label: "HTML", icon: "🟧" },
    { id: "css", label: "CSS", icon: "🟦" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-3 rounded-lg">
                <span className="text-white text-xl font-bold">{"</>"}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Summer Camp Code Snippets</h1>
                <p className="text-gray-600">Learn to code with these helpful examples</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="text-lg">👥</span>
                <span>For Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">📅</span>
                <span>Summer 2025</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Code Examples by Language</h2>
          <p className="text-gray-600">Click the copy button on any code snippet to copy it to your clipboard!</p>
        </div>

        {/* Custom Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {codeSnippets[activeTab]?.map((snippet) => (
            <div
              key={snippet.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{snippet.title}</h3>
                    <p className="text-gray-600 mt-1">{snippet.description}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(snippet.difficulty)}`}
                  >
                    {snippet.difficulty}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed">
                    <code>{snippet.code}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(snippet.code, snippet.id)}
                    className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors flex items-center space-x-1"
                  >
                    {copiedSnippet === snippet.id ? (
                      <>
                        <span>✓</span>
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <span>📋</span>
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Learning Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {tabs.map((tab) => (
              <div key={tab.id} className="text-center">
                <div className="text-2xl mb-2">{tab.icon}</div>
                <div className="text-2xl font-bold text-indigo-600">{codeSnippets[tab.id]?.length || 0}</div>
                <div className="text-sm text-gray-600">{tab.label} Examples</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-lg">
              Happy coding! 🚀 Remember to practice these examples and experiment with your own variations.
            </p>
            <p className="text-sm text-gray-500 mt-2">Summer Camp 2025 • Made with ❤️ for young developers</p>
            <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-500">
              <span>💡 Tip: Try modifying the code examples to see what happens!</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
