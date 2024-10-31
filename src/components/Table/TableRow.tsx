
interface costBreakdown {
  category: string;
  details: string;
  cost: number;
  date: string;
}

const TableRow = ({category, details, cost, date}: costBreakdown) => {
  return (
    <tbody>
      <tr>
        <td>{category}</td>
        <td>{details}</td>
        <td>{cost}</td>
        <td>{date}</td>
      </tr>
    </tbody>
  )
}

export default TableRow