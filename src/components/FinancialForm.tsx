import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  category: string;
  details: string;
  cost: number;
  date: Date;
};

const FinancialForm = () => {
  const {register, handleSubmit} = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    alert(JSON.stringify(data));
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Categoría: 
        <input {...register("category")}/>
      </label>
      <label>
        Detalle:
        <input {...register("details")}/>
      </label>
      <label>
        Valor:
        <input type="number" {...register("cost")}/>
      </label>
      <label>
        Fecha:
        <input type="date" {...register("date")}/>
      </label>
      <input type='submit' value="submit"/>
    </form>
  )
}

export default FinancialForm