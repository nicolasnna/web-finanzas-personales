import { Route, Routes } from "react-router"
import Layout from "./components/Layout"
import Dashboard from "./routes/Dashboard"
import Incomes from "./routes/Incomes"
import { URLS } from "./utils/constants"
import { useContext, useEffect } from "react"
import { AuthContext } from "./context/authContext"
import Expenses from "./routes/Expenses"

function App() {
  const user = useContext(AuthContext)

  useEffect(() => {
    if (user.token) {
      user.updateToken()
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