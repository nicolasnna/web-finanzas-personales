import FinancialForm from "@/components/FinancialForm";
import FinancialTable from "@/components/FinancialTable";
import Header from "@/components/Header";
import { addIncomeDb } from "@/services/dbService";
import {  useIncomeStore } from "@/store/useBalanceStore";

const Incomes = () => {
  const incomeRows = useIncomeStore(state => state.balanceRows)

  return (
    <div className="flex flex-col items-center justify-center space-y-9">
      <Header text="Ingresos"/>

      <section className="flex justify-center w-full gap-24">
        <FinancialTable title="Ingresos" content={incomeRows}/>
        <FinancialForm title="Añade un nuevo ingreso" {...useIncomeStore()} addDb={addIncomeDb}/>
      </section>

    </div>
  );
}

export default Incomes;