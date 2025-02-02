import Header  from "@components/Header"
import { useExpenseStore, useIncomeStore } from "./store/useBalanceStore"
import FinancialTable from "@components/FinancialTable"
import FinancialForm from "@components/FinancialForm"
import Navbar from "./components/Navbar"
import { addExpenseDb, addIncomeDb, getExpensesDb, getIncomesDb } from "./services/dbService"
import { useContext, useEffect } from "react"
import { AuthContext } from "./context/authContext"
import BackgroundNumbers from "./components/BackgroundNumbers"

function App() {
  const { balanceRows: expenseRows, setBalanceRows: setExpensesRows } = useExpenseStore()
  const { balanceRows: incomeRows, setBalanceRows: setIncomesRows } = useIncomeStore()
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
  }, [user, setIncomesRows, setExpensesRows])


  return (
    <div className="bg-white relative">
      <BackgroundNumbers/>
      <div className="flex flex-col items-center justify-center space-y-9">
        <Navbar/>
        <Header text="Mi plan financiero"/>
        <section className="flex justify-center w-full gap-24">
          <FinancialTable title="Ingresos" content={incomeRows}/>
          <FinancialForm title="Añade un nuevo ingreso" {...useIncomeStore()} addDb={addIncomeDb}/>
        </section>
        <section className="flex justify-center w-full gap-24">
          <FinancialTable title="Gastos" content={expenseRows}/>
          <FinancialForm title="Añade un nuevo gasto" {...useExpenseStore()} addDb={addExpenseDb}/>
        </section>
      </div>  
      
    </div>
  )
}


export default App