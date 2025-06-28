import FinancialForm from "@/components/FinancialForm";
import FinancialTable from "@/components/FinancialTable";
import { addIncomeDb } from "@/api/dbIncomes";
import { addExpenseDb } from "@/api/dbExpenses";
import { useExpenseStore, useIncomeStore } from "@/store/useBalanceStore";
import { addCategoryExpenseDb } from "@/api/dbCategoryExpenses";
import { addCategoryIncomeDb } from "@/api/dbCategoryIncomes";

const Home = () => {
  const expenseRows = useExpenseStore(state => state.balanceRows)
  const incomeRows= useIncomeStore(state => state.balanceRows)
  const expenseAddCategory = useExpenseStore(state => state.addCategory)
  const incomeAddCategory = useIncomeStore(state => state.addCategory)


  return (
    <div className="bg-white flex flex-col items-center justify-center space-y-9 w-full my-10">
      <section className="flex justify-center w-full gap-24">
        <FinancialTable title="Ingresos" content={incomeRows}/>
        <FinancialForm title="Añade un nuevo ingreso" {...useIncomeStore()} addDb={addIncomeDb} addCategory={incomeAddCategory} addCategoryDb={addCategoryIncomeDb}/>
      </section>
      <section className="flex justify-center w-full gap-24">
        <FinancialTable title="Gastos" content={expenseRows}/>
        <FinancialForm title="Añade un nuevo gasto" {...useExpenseStore()} addDb={addExpenseDb} addCategory={expenseAddCategory} addCategoryDb={addCategoryExpenseDb}/>
      </section>
    </div>  
  )
}

export default Home;