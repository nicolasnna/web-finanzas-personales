import { useContext, useEffect } from "react"
import { Route, Routes } from "react-router"
import Layout from "./components/Layout"
import { AuthContext } from "./context/authContext"
import Home from "./routes/Home"
import Incomes from "./routes/Incomes"
import { getExpensesDb, getIncomesDb } from "./services/dbService"
import { useExpenseStore, useIncomeStore } from "./store/useBalanceStore"
import { URLS } from "./utils/constants"

function App() {
  const setExpensesRows  = useExpenseStore(state => state.setBalanceRows)
  const setIncomesRows = useIncomeStore(state => state.setBalanceRows)
  const {user, logout} = useContext(AuthContext)
  
  useEffect(() => {
    const updateIncomes = async () => {
      console.log("User: ", user)
      if (user) {
        let dataIncomes = null
        let dataExpenses = null
        try {
          dataIncomes = await getIncomesDb(user)
          dataExpenses = await getExpensesDb(user)
          setIncomesRows(dataIncomes)
          setExpensesRows(dataExpenses)
        
        } catch (error) {
          console.error("Eror al obtener los ingresos y gastos: ", error)
        } finally{
          if (!dataIncomes || !dataExpenses) {
            logout()
          }
        }
      }
    }

    updateIncomes()
  }, [user])


  return (
    <Layout >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={URLS.INCOMES} element={<Incomes />} />
      </Routes>
    </Layout>
  )
}


export default App