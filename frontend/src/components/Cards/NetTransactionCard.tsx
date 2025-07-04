import { useContext, useEffect, useState } from "react";
import CardInfo from "./CardInfo";
import { AuthContext } from "@/context/authContext";
import { getResumeTransactionByMonth } from "@/api/resumes";

interface infoValues {
  value: number,
  currency: string,
  info: string
}

const defaultValue: infoValues = {
  value: 800000,
  currency: 'CLP',
  info: 'Gasto neto',
}

export function NetTransactionCard() {
  const token = useContext(AuthContext).token
  const [transaction, setTransaction] = useState<infoValues>(defaultValue)
  const statusCheck = transaction.value > 0 ? 'increment' : transaction.value < 0 ? 'decrement' : undefined

  useEffect(() => {
    if (!token) return

    const getTransactionFetch = async () => {
      const [incomes, expenses] = await Promise.all([
        getResumeTransactionByMonth(token, 'incomes', 2025),
        getResumeTransactionByMonth(token, 'expenses', 2025)
      ])
      setTransaction((prev) => ({
        ...prev, 
        value: incomes.data[6] - expenses.data[6]
      }))
    }
    getTransactionFetch()
  }, [token])

  return (
    <CardInfo
      title="Resultado neto del mes"
      value={transaction.value}
      currency={transaction.currency}
      info={transaction.info}
      status={statusCheck}
    />
  )
}