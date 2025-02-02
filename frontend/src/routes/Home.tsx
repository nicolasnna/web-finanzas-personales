import FinancialForm from "@/components/FinancialForm";
import FinancialTable from "@/components/FinancialTable";
import Header from "@/components/Header";
import { addExpenseDb, addIncomeDb } from "@/services/dbService";
import { useExpenseStore, useIncomeStore } from "@/store/useBalanceStore";

const Home = () => {
  const expenseRows = useExpenseStore(state => state.balanceRows)
  const incomeRows= useIncomeStore(state => state.balanceRows)

  return (
    <div className="bg-white flex flex-col items-center justify-center space-y-9">
      
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
  )
}

export default Home;