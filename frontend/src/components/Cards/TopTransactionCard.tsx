import { HTMLProps, useContext, useEffect, useState } from "react";
import CardInfo from "./CardInfo";
import { AuthContext } from "@/context/authContext";
import { getTopTransactionAPI } from "@/api/resumes";
import { toast } from "sonner";
import { Transaction } from "@/types";

interface TopTransactionCardProps {
  type: 'incomes' | 'expenses',
  className?: HTMLProps<HTMLElement>["className"]
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

export function TopTransactionCard({type, className}: TopTransactionCardProps) {
  const [topTransaction, setTopTransaction] = useState<CardInfo>(defaultValues[type])
  const token = useContext(AuthContext).token
  const title = type === 'incomes' ? 'Mayor ingreso del mes' : 'Mayor gasto del mes'

  useEffect(() => {
    const getTop = async () => {
      if (!token) return
      const dateNow = new Date(Date.now())
      try {
        const res = await getTopTransactionAPI(token, type, dateNow.getFullYear(), dateNow.getMonth(),1)
        const data = res[0] as Transaction
        setTopTransaction({
          value: data.value,
          info: data.details || '',
          currency: data.currency
        })
      } catch {
        toast.error(`Error al obtener el top de ${type} | ${dateNow.getMonth()} ${dateNow.getFullYear()}`)
      }
    } 
    getTop()
  }, [token, type])


  return (
    <CardInfo
      key={`${type} 1`}
      title={title}
      value={topTransaction.value}
      currency={topTransaction.currency}
      info={topTransaction.info}
      status={undefined}
      className={className}
    />
  )
}

