import { useContext, useEffect, useState } from 'react';
import RegisterForm from './Auth/RegisterEmail';
import SignupEmail from './Auth/SignupEmail';
import { AuthContext } from '@/context/authContext';
import { Button } from './ui/button';
import {
  BadgeDollarSign,
  ChartLine,
  ShoppingCart,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

const views = [
  {
    id: 'dashboard',
    text: 'Dashboard',
    icon: ChartLine,
    url: '/',
    title: 'Mi plan financiero',
  },
  {
    id: 'incomes',
    text: 'Ingresos',
    icon: BadgeDollarSign,
    url: '/incomes',
    title: 'Mis ingresos',
  },
  {
    id: 'expenses',
    text: 'Gastos',
    icon: ShoppingCart,
    url: '/expenses',
    title: 'Mis gastos',
  },
  // {
  //   id: 'perfil',
  //   text: 'Perfil',
  //   icon: UserRoundPen,
  //   url: '/profile',
  //   title: 'Mi perfil',
  // },
];
const selectedButtton = 'bg-blizzard-blue-200 text-secondary-950 font-bold';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigation = useNavigate();
  const [active, setActive] = useState<Array<boolean>>(
    Array(views.length).fill(false)
  );

  useEffect(() => {
    const newArray = views.map((v) => v.url === location.pathname);
    setActive(newArray);
  }, [location]);

  return (
    <nav className="w-full bg-blizzard-blue-950 border-b-4 border-blizzard-blue-200 z-20 select-none md:px-10 shadow-[0_2px_2px_rgba(0,0,0,0.4)]">
      <div className="px-4 py-3 flex items-center justify-around w-full">
        <h2 className="text-3xl text-blizzard-blue-50 font-semibold">
          {views.filter((f) => f.url === location.pathname)[0].title}
        </h2>
        {!token && (
          <div className="gap-2 flex flex-wrap justify-end">
            <SignupEmail />
            <RegisterForm />
          </div>
        )}
        {token && (
          <div className="gap-5 flex flex-row justify-center items-center ">
            <p className="text-blizzard-blue-50">Sesión iniciada</p>
            <Button
              variant="secondary"
              onClick={() => {
                logout();
              }}
              className="border-[1px] border-b-[3px] border-r-[3px] border-blizzard-blue-500"
            >
              Cerrar sesión
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-center flex-wrap-reverse">
        {views.map((v, index) => (
          <button
            key={v.id}
            className={`text-blizzard-blue-50 pb-2 pt-1 text-xl px-3 hover:bg-blizzard-blue-200 hover:text-secondary-950 flex justify-center items-center gap-2 ${
              active[index] ? selectedButtton : 'bg-blizzard-blue-200/15 '
            } active:font-bold`}
            onClick={() => navigation(v.url)}
          >
            {v.icon && <v.icon />}
            <p>{v.text}</p>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
