import { getTopTransactionAPI } from "@/api/resumes";
import { AuthContext } from "@/context/authContext";
import { months } from "@/utils/constants";
import { HTMLProps, useCallback, useContext, useEffect, useState } from "react";
import CardInfo from "./CardInfo";
import { useTypeTransactionStore } from "@/hooks/useTypeTransactionStore";
import { sortTransactions } from "@/utils/functions";

interface TopTransactionCardProps {
  type: 'incomes' | 'expenses',
  className?: HTMLProps<HTMLElement>["className"],
  month?:number
  year?: number
}

interface CardInfo {
  value: number,
  currency: string,
  info: string,
}

const defaultValues: Record<string, CardInfo> = {
  incomes: {
    value: 0,
    currency: 'CLP',
    info: '',
  },
  expenses: {
    value: 0,
    currency: 'CLP',
    info: '',
  }
}

export function CardTopTransaction({type, className, month, year}: TopTransactionCardProps) {
  const [topTransaction, setTopTransaction] = useState<CardInfo>(defaultValues[type])
  const token = useContext(AuthContext).token
  const title = type === 'incomes' ? 'Mayor ingreso del mes' : 'Mayor gasto del mes'
  const transactions = useTypeTransactionStore(type).transaction

  useEffect(() => {
    const getTop = async () => {
      if (!token) {
        setTopTransaction(defaultValues[type])
        return
      }
      const dateNow = new Date(Date.now())
      try {
        const res = await getTopTransactionAPI(token, type, year ?? dateNow.getFullYear(), month ?? dateNow.getMonth(),1)
        const data = res[0]
        setTopTransaction({
          value: data.value,
          info: data.details || '',
          currency: data.currency
        })
      } catch {
        setTopTransaction({
          value: 0,
          info: '',
          currency: 'CLP'
        })
      }
    } 
    getTop()
  }, [token, type, month, year])

  const getTopTransactionLocal = useCallback(() => {
    if (token) return
    if (transactions.length === 0) {
      setTopTransaction(defaultValues[type])
      return
    }
    const filterDate = transactions.filter(t => new Date(t.date).getMonth()+1 === month && new Date(t.date).getFullYear() === year )
    if (filterDate.length === 0){
      setTopTransaction(defaultValues[type])
      return
    }
    const sorted = [...filterDate].sort(sortTransactions)
    console.log(sorted)
    setTopTransaction({
      value: sorted[0].value,
      info: sorted[0].details ?? '',
      currency: sorted[0].currency
    })
  }, [token, month, year, transactions, type])

  useEffect(() => {
    if (!token) getTopTransactionLocal()
  }, [token, getTopTransactionLocal])

  return (
    <CardInfo
      key={`${type} 1`}
      title={title}
      value={topTransaction.value}
      currency={topTransaction.currency}
      info={
        `${topTransaction.info} | ${months[(month && month-1) ?? new Date(Date.now()).getMonth()]}`
      }
      status={undefined}
      className={className}
    />
  )
}

