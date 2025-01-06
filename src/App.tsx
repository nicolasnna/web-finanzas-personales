import Header  from "@components/Header"
import { useExpenseStore, useIncomeStore } from "./store/useBalanceStore"
import FinancialTable from "@components/FinancialTable"
import FinancialForm from "@components/FinancialForm"
import Navbar from "./components/Navbar"

function App() {
  const { balanceRows: expenseRows } = useExpenseStore()
  const { balanceRows: incomeRows} = useIncomeStore()

  return (
    <div className="bg-[#f6fdff]">

      <div className="flex flex-col items-center justify-center space-y-9 z-10">
        <Navbar/>
        <Header text="Mi plan financiero"/>
        <section className="flex justify-center w-full gap-24">
          <FinancialTable title="Ingresos" content={incomeRows}/>
          <FinancialForm title="Añade un nuevo ingreso" {...useIncomeStore()}/>
        </section>
        <section className="flex justify-center w-full gap-24">
          <FinancialTable title="Gastos" content={expenseRows}/>
          <FinancialForm title="Añade un nuevo gasto" {...useExpenseStore()}/>
        </section>
      </div>  
      
    </div>
  )
}


export default App