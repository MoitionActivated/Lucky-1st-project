import { useEffect, useState } from 'react'
import Button from './components/Button'
import Card from './components/Card'
import Header from './components/Header'

function App() {
  const [theme, setTheme] = useState<string>('light')

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      setTheme(saved)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <Header toggleTheme={toggleTheme} currentTheme={theme} />
      <main className="container">
        <section className="grid">
          <Card title="Status">
            <div className="status-bar" aria-live="polite">
              All systems nominal 🟢
            </div>
          </Card>
          <Card title="Controls">
            <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap'}}>
              <Button variant="primary">Start</Button>
              <Button variant="secondary">Stop</Button>
              <Button variant="ghost">Refresh</Button>
            </div>
          </Card>
          <Card title="Agents">
            <p>Multi-agent Roundtable status: Ready</p>
          </Card>
          <Card title="Memory">
            <p>PKM sync: Up to date (Phase 4)</p>
          </Card>
        </section>
      </main>
    </>
  )
}

export default App