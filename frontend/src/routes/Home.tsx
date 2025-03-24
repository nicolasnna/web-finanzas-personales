import FinancialForm from "@/components/FinancialForm";
import FinancialTable from "@/components/FinancialTable";
import Header from "@/components/Header";
import { addIncomeDb } from "@/services/dbIncomes";
import { addExpenseDb } from "@/services/dbExpenses";
import { useExpenseStore, useIncomeStore } from "@/store/useBalanceStore";
import { addCategoryExpenseDb } from "@/services/dbCategoryExpenses";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import { addCategoryIncomeDb } from "@/services/dbCategoryIncomes";
import { category } from "@/types";

const Home = () => {
  const expenseRows = useExpenseStore(state => state.balanceRows)
  const incomeRows= useIncomeStore(state => state.balanceRows)
  const {user} = useContext(AuthContext)
  const expenseAddCategory = useExpenseStore(state => state.addCategory)
  const incomeAddCategory = useIncomeStore(state => state.addCategory)

  const addCategoryExpense = async (category: category) => {
    if (user)
      await addCategoryExpenseDb(category, user)
    else 
      expenseAddCategory(category)
  }

  const addCategoryIncome = async (category: category) => {
    if (user)
      await addCategoryIncomeDb(category, user)
    else 
      incomeAddCategory(category)
  }

  return (
    <div className="bg-white flex flex-col items-center justify-center space-y-9">
      
      <Header text="Mi plan financiero"/>
      <section className="flex justify-center w-full gap-24">
        <FinancialTable title="Ingresos" content={incomeRows}/>
        <FinancialForm title="Añade un nuevo ingreso" {...useIncomeStore()} addDb={addIncomeDb} addCategory={addCategoryIncome}/>
      </section>
      <section className="flex justify-center w-full gap-24">
        <FinancialTable title="Gastos" content={expenseRows}/>
        <FinancialForm title="Añade un nuevo gasto" {...useExpenseStore()} addDb={addExpenseDb} addCategory={addCategoryExpense}/>
      </section>
    </div>  
  )
}

export default Home;