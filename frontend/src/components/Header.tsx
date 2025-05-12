const Header = ({text} : {text: string}) => {
  return (
    <div className="p-6 z-10 select-none">
      <h1 className="text-5xl text-blizzard-blue-950 font-bold"
        style={{
          textShadow: "2px 2px 1px #7dd3fc"
        }}
      >{text}</h1>
    </div>
  )
}


export default Header
