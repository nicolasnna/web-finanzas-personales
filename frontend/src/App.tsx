import { Route, Routes } from "react-router"
import Layout from "./components/Layout"
import Dashboard from "./routes/Dashboard"
import Incomes from "./routes/Incomes"
import { URLS } from "./utils/constants"
import { useContext, useEffect } from "react"
import { AuthContext } from "./context/authContext"
import Expenses from "./routes/Expenses"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { useTypeTransactionStore } from "./hooks/useTypeTransactionStore"
import { useTypeCategoryStore } from "./hooks/useTypeCategoryStore"

function App() {
  const user = useContext(AuthContext)
  const setupIncomes = useLocalStorage('incomes').setupDemoValues
  const setupExpenses = useLocalStorage('expenses').setupDemoValues
  const setupCategoryIncomes = useLocalStorage('categoryIncomes').setupDemoValues
  const setupCategoryExpenses = useLocalStorage('categoryExpenses').setupDemoValues
  const loadIncomes = useTypeTransactionStore('incomes').loadFromLocalStorage
  const loadExpenses = useTypeTransactionStore('expenses').loadFromLocalStorage
  const loadCategoryIncomes = useTypeCategoryStore('incomes').loadFromLocalStorage
  const loadCategoryExpenses = useTypeCategoryStore('expenses').loadFromLocalStorage

  useEffect(() => {
    if (user.token) {
      user.updateToken()
    } else {
      setupIncomes()
      setupExpenses()
      setupCategoryIncomes()
      setupCategoryExpenses()
      loadIncomes()
      loadExpenses()
      loadCategoryIncomes()
      loadCategoryExpenses()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path={URLS.INCOMES} element={<Incomes />} />
        <Route path={URLS.EXPENSES} element={<Expenses />} />
      </Routes>
    </Layout>
  )
}


export default App