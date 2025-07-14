import { getCountsTotalAPI } from "@/api/resumes";
import CardContainer from "@/components/Cards/CardContainer";
import CardInfo from "@/components/Cards/CardInfo";
import CategoryForm from "@/components/Form/CategoryForm";
import TransactionForm from "@/components/Form/TransactionForm";
import { CategoryTable } from "@/components/Table/CategoryTable";
import { TransactionTable } from "@/components/Table/TransactionTable";
import { AuthContext } from "@/context/authContext";
import { useExpensesStore } from "@/store/useTransactionStore";
import { TotalCountsAPI } from "@/types";
import { useContext, useEffect, useMemo, useState } from "react";

const Expenses = () => {
  const token = useContext(AuthContext).token
  const [totalCounts, setTotalCounts] = useState<TotalCountsAPI>({
    incomes: 0,
    expenses: 0,
    categoryIncomes: 0,
    categoryExpenses: 0
  })
  const transactionsExpenses = useExpensesStore(s => s.transactions)
  const totalAccumulative = useMemo(() => {
    if (transactionsExpenses.length === 0) return 0 
    const onlyValues = transactionsExpenses.map(t => t.value)
    return onlyValues.reduce((acc, current) => acc = acc + current)
  }, [transactionsExpenses])

  useEffect(() => {
    const fetchCounts = async () => {
      if (!token) return
      const res = await getCountsTotalAPI(token)

      if (res instanceof Error) return

      setTotalCounts(res)
    }
    fetchCounts()

  }, [token])

  return (
    <div className="mx-5 xl:mx-[250px] my-10 flex flex-col gap-5">
      <section className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
        <CardInfo
          title='Registros existentes'
          value={totalCounts.expenses}
          classNameHeader="pb-4"
        />
        <CardInfo
          title='Categorías creadas'
          value={totalCounts.categoryExpenses}
          classNameHeader="pb-4"
        />
        <CardInfo
          title='Total acumulado'
          value={totalAccumulative}
          currency={transactionsExpenses.length > 0 ? transactionsExpenses[0].currency : 'CLP'}
          classNameHeader='pb-4'
        />
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-2">
        <CardContainer
          className="md:col-span-2"
          classNameBody="p-4 pb-2"
        >
          <TransactionTable type="expenses"/>
        </CardContainer>
        <CardContainer
          classNameBody="p-4 pb-2"
        >
          <CategoryTable type="expenses"/>
        </CardContainer>
      </div>
      <section className='grid md:grid-cols-3 z-10 gap-5'>
        <CardContainer
          title='Registrar nueva categoría'
          className='space-y-1'
          classNameHeader='pt-4'
          classNameBody='pb-2'
        >
          <CategoryForm typeDefault="expenses"/>
        </CardContainer>
        <CardContainer
          title='Registrar nueva transacción'
          className='md:col-span-2'
          classNameHeader='pt-4'
          classNameBody='pb-4'
        >
          <TransactionForm typeDefault="expenses"/>
        </CardContainer>
      </section>
    </div>
  );
};

export default Expenses;
