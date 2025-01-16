const Header = ({text} : {text: string}) => {
  return (
    <div className="p-6">
      <h1 className="text-4xl text-blizzard-blue-950">{text}</h1>
    </div>
  )
}

export default Header
