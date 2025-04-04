
interface Expense {
  id: number
  description: string
  amount: number
  category: string
}

interface Props {
  expenses: Expense[]
  onDelete: (id: number) => void
}

export const ExpenseList = ({ expenses, onDelete }: Props) => {

  const totalExpenses = expenses.reduce( (total, expense) => total + expense.amount, 0)

  return (
    <>
    
      <table className="border border-gray-600 mt-10 w-full">
        <thead className="border border-gray-600 text-left">
          <tr>
            <th className="p-2">Description</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Category</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
            {expenses.map(expense => <tr key={expense.id}>
              <td className="p-2">{expense.description}</td>
              <td className="p-2">{(expense.amount).toLocaleString('en-US', {
                style: "currency",
                currency: "USD"
              })}</td>
              <td className="p-2">{expense.category}</td>
              <td className="p-2">
                <button onClick={() => onDelete(expense.id)} className="py-2 border-2  border-red-500 hover:bg-red-500 cursor-pointer hover:text-white rounded-md w-full">Delete</button>
              </td>
            </tr>)}
          </tbody>
          <tfoot className="border boder-gray-600">
            <tr>
              <td className="p-2 font-bold">Total</td>
              <td className="p-2 font-bold">{(totalExpenses).toLocaleString('en-US', {
                style: "currency",
                currency: "USD"
              })}</td>
            </tr>
          </tfoot>
      </table>
    </>
  )
}
