import CardContainer from "@/components/Cards/CardContainer";
import CategoryForm from "@/components/Form/CategoryForm";
import TransactionForm from "@/components/Form/TransactionForm";
import { TransactionTable } from "@/components/TransactionTable";

const Incomes = () => {

  return (
    <div className="mx-5 xl:mx-[250px] my-10 flex flex-col gap-5">
      <CardContainer
        classNameBody="p-4"
      >
        <TransactionTable type="incomes"/>
      </CardContainer>
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
