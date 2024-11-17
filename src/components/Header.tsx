const Header = ({text} : {text: string}) => {
  return (
    <div className="p-8">
      <h1 className="text-4xl">{text}</h1>
    </div>
  )
}

export default Header
