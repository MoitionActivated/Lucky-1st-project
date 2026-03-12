interface CardProps {
  title: string
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      {children}
    </div>
  )
}

export default Card