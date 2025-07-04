import { getTopTransactionAPI } from "@/api/resumes";
import { AuthContext } from "@/context/authContext";
import { Transaction } from "@/types";
import { months } from "@/utils/constants";
import { HTMLProps, useContext, useEffect, useState } from "react";
import CardInfo from "./CardInfo";

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
    value: 800000,
    currency: 'CLP',
    info: 'Sueldo mayo',
  },
  expenses: {
    value: 300000,
    currency: 'CLP',
    info: 'Compra celular',
  }
}

export function TopTransactionCard({type, className, month, year}: TopTransactionCardProps) {
  const [topTransaction, setTopTransaction] = useState<CardInfo>(defaultValues[type])
  const token = useContext(AuthContext).token
  const title = type === 'incomes' ? 'Mayor ingreso del mes' : 'Mayor gasto del mes'

  useEffect(() => {
    const getTop = async () => {
      if (!token) {
        setTopTransaction(defaultValues[type])
        return
      }
      const dateNow = new Date(Date.now())
      try {
        const res = await getTopTransactionAPI(token, type, year ?? dateNow.getFullYear(), month ?? dateNow.getMonth(),1)
        const data = res[0] as Transaction
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

