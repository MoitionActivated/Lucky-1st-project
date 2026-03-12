import { useEffect, useState } from 'react'
import Button from './components/Button'
import Card from './components/Card'
import Header from './components/Header'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import axios from 'axios'

interface Session {
  key: string
  model: string
  totalTokens: number
}

function App() {
  const [theme, setTheme] = useState<string>('light')
  const [status, setStatus] = useState({ uptime: 'Loading...', tokens: 0 })
  const [agents, setAgents] = useState<Session[]>([])
  const [memory, setMemory] = useState<string[]>([])
  const [cronJobs, setCronJobs] = useState<string[]>([])
  const [tokenData, setTokenData] = useState<{ time: string; tokens: number }[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) setTheme(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const fetchData = async () => {
    try {
      // Mock real OpenClaw API (proxy /api/sessions_list → sessions_list tool)
      const [sessionsRes, statusRes, memoryRes] = await Promise.all([
        axios.get('/api/sessions_list'),
        axios.get('/api/session_status'),
        axios.get('/api/memory_search?query=today')
      ])
      setAgents(sessionsRes.data.sessions || [])
      setStatus(statusRes.data || { uptime: 'Nominal', tokens: 58k })
      setMemory(memoryRes.data.results || ['Phase 2 PKM vault init'])
      // Token sparkline mock
      setTokenData(Array.from({ length: 10 }, (_, i) => ({ time: `T-${9-i}`, tokens: 50k + Math.random() * 10k })))
    } catch (e) {
      console.error('API mock', e)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  const startGateway = () => console.log('🚀 Gateway start/restart')
  const stopGateway = () => console.log('🛑 Gateway stop')
  const spawnAgent = () => console.log('Spawn Roundtable subagent')

  return (
    <>
      <Header toggleTheme={toggleTheme} currentTheme={theme} />
      <main className="container">
        <section className="grid">
          <Card title="Health">
            <div aria-live="polite">
              Uptime: {status.uptime} | Tokens: {status.tokens.toLocaleString()} 
              {status.tokens > 80000 && <span style={{color: 'red'}}> ⚠️ High</span>}
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={tokenData}>
                <CartesianGrid />
                <Line type="monotone" dataKey="tokens" stroke="#FFC628" />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          <Card title="Agents">
            {agents.map(a => (
              <div key={a.key}>
                {a.key} ({a.model}) <Button variant="ghost" onClick={() => console.log(`Kill ${a.key}`)}>Kill</Button>
              </div>
            ))}
            <Button onClick={spawnAgent}>Spawn</Button>
          </Card>
          <Card title="Memory">
            {memory.map((m, i) => <p key={i}>{m}</p>)}
            <input placeholder="Search memory" />
          </Card>
          <Card title="Cron">
            {cronJobs.map((c, i) => <p key={i}>{c}</p>)}
            <Button variant="ghost">Add Cron</Button>
          </Card>
          <Card title="Controls">
            <div style={{display: 'flex', gap: '0.75rem'}}>
              <Button variant="primary" onClick={startGateway}>Start</Button>
              <Button variant="secondary" onClick={stopGateway}>Stop</Button>
              <Button variant="ghost" onClick={fetchData}>Refresh</Button>
            </div>
          </Card>
        </section>
      </main>
    </>
  )
}

export default App
