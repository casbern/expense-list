
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ExpenseFormProps } from "../App"

const schema = z.object({
  description: z.string().min(3, {message: "Description should have at least 3 characters."}).max(50),
  amount: z.number({ invalid_type_error: "Amout field must be filled."}).min(0.01, {message: "Amount must be greater than 0."}).max(100_000),
  category: z.string().min(1, {message: "Please, select a category."})
})

type FormData = z.infer<typeof schema>

interface Props {
  sendExpensesData: (data: ExpenseFormProps) => void
  categories: string[]
}

export const Form = ({sendExpensesData, categories}: Props) => {
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" })

  const onSubmit = (data: FormData) => {
    const newData: ExpenseFormProps = {
      ...data,
      id: Date.now()
    }

    sendExpensesData(newData)
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Adding a new expense</h1>

      <form className="mt-2.5" onSubmit={ handleSubmit( data => {
        onSubmit(data)
        reset()
      }) }>
        <div className="flex flex-col mb-2.5">
          <label htmlFor="description" className="form-label">Description</label>
          <input {...register('description')} id="description" type="text" className="border border-gray-600 pl-4 p-2 rounded-xl"/>
          {
            errors.description && <p className="text-red-500">{errors.description.message}</p>
          }
        </div>

        <div className="flex flex-col mb-2.5">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input {...register('amount', { valueAsNumber: true })} id="amount" type="number" className="border border-gray-600 pl-4 p-2 rounded-xl"/>
          {
            errors.amount && <p className="text-red-500">{errors.amount.message}</p>
          }
        </div>

        <div className="flex flex-col mb-2.5">
          <label htmlFor="Category" className="form-label">Category</label>
          <select {...register('category')} id="category" defaultValue="" className="border border-gray-600 p-2.5 rounded-xl">
            <option value="" disabled >Select</option>

            {
              categories.map( category => (

                <option key={category} value={category}>{category}</option>
              ))
            }
            
          </select>
          {
            errors.category && <p className="text-red-500">{errors.category.message}</p>
          }
        </div>

        <button  disabled={!isValid} className={`p-4 rounded-2xl w-full mt-2.5 
            ${isValid ? "bg-green-800 hover:bg-green-900 text-white cursor-pointer" 
              : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}>Submit</button>
      </form>
    </>
  )
}
