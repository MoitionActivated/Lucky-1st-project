interface HeaderProps {
  toggleTheme: () => void
  currentTheme: string
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, currentTheme }) => {
  return (
    <header className="topbar" aria-label="Main navigation">
      <div className="brand">
        OpenClaw Control 🦊
      </div>
      <button onClick={toggleTheme} className="btn btn-ghost" aria-label={`Toggle to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}>
        {currentTheme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  )
}

export default Header