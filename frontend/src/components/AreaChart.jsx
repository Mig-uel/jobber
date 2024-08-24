import {
  ResponsiveContainer,
  AreaChart as AChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from 'recharts'
import PropTypes from 'prop-types'

const AreaChart = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type='monotone' dataKey='count' stroke='#2cb1bc' fill='#bef8fd' />
      </AChart>
    </ResponsiveContainer>
  )
}

export default AreaChart

AreaChart.propTypes = {
  data: PropTypes.array.isRequired,
}
