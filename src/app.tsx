import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="flex justify-center items-center space-x-8 p-2">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo h-24 p-6 hover:drop-shadow-[0_0_2em_rgba(100,108,255,0.67)]" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img src={preactLogo} class="logo preact h-24 p-6 hover:drop-shadow-[0_0_2em_rgba(103,58,184,0.67)]" alt="Preact logo" />
        </a>
      </div>
      <h1 class="text-5xl font-bold leading-tight mt-8">Vite + Preact</h1>
      <div class="card p-8 mt-4 bg-background shadow-lg rounded-md">
        <button 
          class="border border-transparent rounded-lg py-2 px-4 bg-[#1a1a1a] text-white font-medium transition-colors hover:border-[#646cff] focus:outline-none focus-visible:outline focus-visible:outline-4 focus-visible:outline-webkit-focus-ring-color"
          onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p class="mt-4 text-sm">
          Edit <code class="font-mono bg-gray-100 px-1 rounded">src/app.tsx</code> and save to test HMR
        </p>
      </div>
      <p class="mt-8">
        Check out{' '}
        <a
          href="https://preactjs.com/guide/v10/getting-started#create-a-vite-powered-preact-app"
          target="_blank"
          class="font-medium text-[#646cff] hover:text-[#535bf2] transition-colors"
        >
          create-preact
        </a>
        , the official Preact + Vite starter
      </p>
      <p class="read-the-docs text-gray-500 mt-4">
        Click on the Vite and Preact logos to learn more
      </p>
    </>
  )
}
