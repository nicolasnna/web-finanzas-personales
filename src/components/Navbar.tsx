import { useContext } from "react"
import RegisterForm from "./RegisterEmail"
import SignupEmail from "./SignupEmail"
import { AuthContext } from "@/context/authContext"
import { Button } from "./ui/button"

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <nav className="w-full bg-[rgba(0,0,0,0.1)]">
      <div className="px-4 py-3 flex items-center justify-around w-full">
        <h2 className="text-3xl">
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