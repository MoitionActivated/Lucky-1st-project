import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick }) => {
  return (
    <button 
      className={`btn btn-${variant}`} 
      onClick={onClick}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </button>
  )
}

export default Button