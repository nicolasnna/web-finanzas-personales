import { useForm } from "react-hook-form"
import { Form } from "./ui/form"

function TransactionForm() {
  const form = useForm()
  
  return (
    <Form {...form}>
      <form>

      </form>
    </Form>
  )
}

export default TransactionForm