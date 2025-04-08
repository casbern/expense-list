import categories from "../data/categories"
interface Props {
  setCategory: (e: string) => void
}


export const Select = ({ setCategory }: Props) => {
  return (
    <div className="flex flex-col mb-2.5 mt-10">
      <select onChange={ (e) => setCategory(e.target.value) } id="category" defaultValue="" className="border border-gray-600 p-2.5 rounded-xl">
        <option value="all" >All categories</option>
        {
          categories.map( (category) => (

            <option key={category} value={category}>{category}</option>
          ))
        }
        
      </select>
    </div>
  )
}
