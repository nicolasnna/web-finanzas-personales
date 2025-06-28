import { useContext, useEffect } from "react"
import { Route, Routes } from "react-router"
import Layout from "./components/Layout"
import { AuthContext } from "./context/authContext"
import Incomes from "./routes/Incomes"
import { getIncomesDb } from "./api/dbIncomes"
import { getExpensesDb } from "./api/dbExpenses"
import { useExpenseStore, useIncomeStore } from "./store/useBalanceStore"
import { defaultCategoryExpense, defaultCategoryIncome, URLS } from "./utils/constants"
import { addCategoryIncomeDb, getCategoryIncomeDb } from "./api/dbCategoryIncomes"
import { addCategoryExpenseDb, getCategoryExpenseDb } from "./api/dbCategoryExpenses"
import Dashboard from "./routes/Dashboard"

function App() {
  // const setExpensesRows  = useExpenseStore(state => state.setBalanceRows)
  // const setIncomesRows = useIncomeStore(state => state.setBalanceRows)
  // const setExpensesCategory = useExpenseStore(s => s.setCategories)
  // const setIncomesCategory = useIncomeStore(s => s.setCategories)
  // const {user, updateToken} = useContext(AuthContext)
  
  // useEffect(() => {
  //   const updateIncomes = async () => {
  //     if (user) {
  //       let dataIncomes = null
  //       let dataExpenses = null
  //       let dataCategoriesIncomes = null
  //       let dataCategoriesExpenses = null
  //       try {
  //         dataIncomes = await getIncomesDb(user)
  //         dataExpenses = await getExpensesDb(user)
  //         dataCategoriesIncomes = await getCategoryIncomeDb(user)
  //         dataCategoriesExpenses = await getCategoryExpenseDb(user)
  //         for (const e of defaultCategoryExpense) {
  //           if (Array.isArray(dataCategoriesExpenses) && !dataCategoriesExpenses.some(db => db.category == e.category))
  //             await addCategoryExpenseDb(e, user)
  //         }
  //         for (const e of defaultCategoryIncome) {
  //           if (Array.isArray(dataCategoriesIncomes) && !dataCategoriesIncomes.some(db => db.category == e.category))
  //             await addCategoryIncomeDb(e, user)
  //         }
  //         dataCategoriesIncomes = await getCategoryIncomeDb(user)
  //         dataCategoriesExpenses = await getCategoryExpenseDb(user)
  //         if (Array.isArray(dataIncomes))
  //           setIncomesRows(dataIncomes)
  //         if (Array.isArray(dataExpenses))
  //           setExpensesRows(dataExpenses)
  //         if (Array.isArray(dataCategoriesIncomes))
  //           setIncomesCategory(dataCategoriesIncomes)
  //         if (Array.isArray(dataCategoriesExpenses))
  //           setExpensesCategory(dataCategoriesExpenses)
  //       } catch {
  //         await updateToken()
  //       } 
  //     }
  //   }

  //   updateIncomes()
  //   //eslint-disable-next-line
  // }, [user])


  return (
    <Layout >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path={URLS.INCOMES} element={<Incomes />} />
      </Routes>
    </Layout>
  )
}


export default App