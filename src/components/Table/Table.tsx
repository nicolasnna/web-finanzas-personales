import TableHeader from './TableHeader'
import TableRow from './TableRow'

const tableValues = {
  category: "pan",
  details: "Compra de pan",
  cost: 23440,
  date: "2024-10-03"
}

const Table = () => {
  return (
    <table>
      <TableHeader/>
      <TableRow {...tableValues}/>
    </table>
  )
}

export default Table