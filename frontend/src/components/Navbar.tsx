import { useContext, useEffect, useState } from "react"
import RegisterForm from "./RegisterEmail"
import SignupEmail from "./SignupEmail"
import { AuthContext } from "@/context/authContext"
import { Button } from "./ui/button"
import { BadgeDollarSign, ChartLine, ShoppingCart } from "lucide-react"
import { useLocation } from "react-router"

const views = [
  {id: "dashboard", text: "Dashboard", icon: ChartLine, url: '/', title: 'Mi plan financiero'},
  {id: "incomes", text: "Ingresos", icon: BadgeDollarSign, url: '/incomes', title: 'Mis ingresos'},
  {id: "expenses", text: "Gastos", icon: ShoppingCart, url: '/expenses', title: 'Mis gastos'}
]
const selectedButtton = 'bg-blizzard-blue-200 text-secondary-950 font-bold'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const location = useLocation();
  const [active, setActive] = useState<Array<boolean>>(Array(views.length).fill(false))
  
  useEffect(() => {
    const newArray = views.map(v => v.url === location.pathname)
    setActive(newArray)
  },[location])
  console.log(location.pathname)
  
  return (
    <nav className="w-full bg-blizzard-blue-950 border-b-2 border-blizzard-blue-200 z-20 select-none md:px-10">
      <div className="px-4 py-3 flex items-center justify-around w-full">
        <h2 className="text-3xl text-blizzard-blue-50 font-semibold">
          {views.filter(f => f.url === location.pathname)[0].title}
        </h2>
        {!user && <div className="space-x-5">
          <SignupEmail/>
          <RegisterForm/>
        </div>}
        {user && <div className="space-x-5 flex flex-row justify-center items-center">
          <div><strong>Sesión iniciada</strong></div>
          <Button variant="outline" onClick={() => {logout()}}>Cerrar sesión</Button>
        </div>}
      </div>
      <div className="flex flex-row justify-center">
          {views.map((v, index) => 
          <button key={v.id} className={`text-blizzard-blue-50 pb-2 pt-1 text-xl px-3 hover:bg-blizzard-blue-200 hover:text-secondary-950 flex justify-center items-center gap-2 ${active[index] ? selectedButtton : 'bg-blizzard-blue-200/15 '} active:font-bold`}>
            {v.icon && <v.icon />}
            <p>{v.text}</p>
          </button>)}
      </div>
    </nav>
  )
}
  
export default Navbar