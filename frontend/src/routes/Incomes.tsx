import { getCountsTotalAPI } from "@/api/resumes";
import CardContainer from "@/components/Cards/CardContainer";
import CardInfo from "@/components/Cards/CardInfo";
import CategoryForm from "@/components/Form/CategoryForm";
import TransactionForm from "@/components/Form/TransactionForm";
import { CategoryTable } from "@/components/Table/CategoryTable";
import { TransactionTable } from "@/components/Table/TransactionTable";
import { AuthContext } from "@/context/authContext";
import { useIncomeCategoriesStore } from "@/store/useCategoryStore";
import { useIncomesStore } from "@/store/useTransactionStore";
import { TotalCountsAPI } from "@/types";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

const Incomes = () => {
  const token = useContext(AuthContext).token
  const [totalCounts, setTotalCounts] = useState<TotalCountsAPI>({
    incomes: 0,
    expenses: 0,
    categoryIncomes: 0,
    categoryExpenses: 0
  })
  const transactionsIncomes = useIncomesStore(s => s.transactions)
  const categoriesIncomes = useIncomeCategoriesStore(s => s.categories)
  
  const totalAcumulative = useMemo(() => {
    if (transactionsIncomes.length === 0) return 0
    const onlyValues = transactionsIncomes.map(t => t.value)
    return onlyValues.reduce((acc, currentTrans) => acc = acc + currentTrans)
  }, [transactionsIncomes])

  useEffect(() => {
    const fetchCounts = async () => {
      if (!token) return
      const res = await getCountsTotalAPI(token)
      if (res instanceof Error) return
      setTotalCounts(res)
    }
    fetchCounts()

  }, [token]) 

  const checkCounts = useCallback(() => {
    if (token) return
    setTotalCounts({
          incomes: transactionsIncomes.length,
          expenses: 0,
          categoryIncomes: categoriesIncomes.length,
          categoryExpenses: 0
        })
  }, [token, transactionsIncomes, categoriesIncomes])

  useEffect(() => {
    if (!token) checkCounts()
  }, [token, checkCounts])


  return (
    <div className="mx-5 xl:mx-[250px] my-10 flex flex-col gap-5">
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        <CardInfo
          title="Registros existentes"
          value={totalCounts.incomes}
          classNameHeader="pb-4"
        />
        <CardInfo 
          title="Categorías creadas"
          value={totalCounts.categoryIncomes}
          classNameHeader="pb-4"
        />
        <CardInfo 
          title="Total acumulado"
          value={totalAcumulative}
          currency={transactionsIncomes.length > 0 ? transactionsIncomes[0].currency : 'CLP'}
          classNameHeader="pb-4"
        />
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-2">
        <CardContainer
          className="md:col-span-2"
          classNameBody="p-4 pb-2"
        >
          <TransactionTable type="incomes"/>
        </CardContainer>
        <CardContainer
          classNameBody="p-4 pb-2"
        >
          <CategoryTable type="incomes"/>
        </CardContainer>
      </div>

      <section className='grid md:grid-cols-3 z-10 gap-5'>
        <CardContainer
          title='Registrar nueva categoría'
          className='space-y-1'
          classNameHeader='pt-4'
          classNameBody='pb-2'
        >
          <CategoryForm typeDefault="incomes"/>
        </CardContainer>
        <CardContainer
          title='Registrar nueva transacción'
          className='md:col-span-2'
          classNameHeader='pt-4'
          classNameBody='pb-4'
        >
          <TransactionForm typeDefault="incomes"/>
        </CardContainer>
      </section>
    </div>
  );
};

export default Incomes;
