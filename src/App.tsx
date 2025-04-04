import { useState } from "react";
import { Form } from "./components/Form"
import { ExpenseList } from "./components/ExpenseList"
import { Select } from "./components/Select";

export interface ExpenseFormProps {
  id: number
  description: string
  amount: number
  category: string
}

function App() {
  
  const [ expensesData, setExpensesData ] = useState<ExpenseFormProps[]>([])
  
  const sendExpensesData = (newData: ExpenseFormProps) => setExpensesData([...expensesData, newData])
  
  const [category, setCategory] = useState<string>("all")

  const filteredExpenses = category === "all" ? expensesData : expensesData.filter( expense => category === expense.category)

  const handleDelete = (id: number) => {
    const newExpensesData = expensesData.filter( expense => id !== expense.id)

    setExpensesData([...newExpensesData])
  }

  return (
    <div className=" min-h-screen bg-gray-100">

      <div className="w-2xl m-auto p-5 ">
        <Form sendExpensesData={ sendExpensesData }/>

        <Select setCategory={setCategory}/>

        <ExpenseList expenses={ filteredExpenses } onDelete={ handleDelete }/>
      </div>
    </div>
  )
}

export default App
