import RegisterForm from "./RegisterEmail"
import { Button } from "./ui/button"

const Navbar = () => {
  return (
    <nav className="w-full bg-[rgba(0,0,0,0.1)]">
      <div className="px-4 py-3 flex items-center justify-around w-full">
        <h2 className="text-3xl">
          Finanzas personales
        </h2>
        <div className="space-x-5">
          <Button variant="default">Ingresar</Button>
          <RegisterForm/>
        </div>
      </div>
    </nav>
  )
}
  
export default Navbar