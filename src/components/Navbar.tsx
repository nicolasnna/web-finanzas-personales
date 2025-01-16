import { useContext } from "react"
import RegisterForm from "./RegisterEmail"
import SignupEmail from "./SignupEmail"
import { AuthContext } from "@/context/authContext"
import { Button } from "./ui/button"

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <nav className="w-full bg-blizzard-blue-200 bg-opacity-50 border-b-2 border-blizzard-blue-800">
      <div className="px-4 py-3 flex items-center justify-around w-full">
        <h2 className="text-3xl text-orange-900">
          Finanzas personales
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
    </nav>
  )
}
  
export default Navbar