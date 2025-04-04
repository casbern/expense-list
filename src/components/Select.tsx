interface Props {
  setCategory: (e: string) => void
}


export const Select = ({ setCategory }: Props) => {
  return (
    <div className="flex flex-col mb-2.5 mt-10">
      <select onChange={ (e) => setCategory(e.target.value) } id="category" defaultValue="" className="border border-gray-600 p-2.5 rounded-xl">
        <option value="all" >All categories</option>
        <option value="groceries">Groceries</option>
        <option value="utilities">Utilities</option>
        <option value="entertainment">Entertainment</option>
      </select>
    </div>
  )
}
