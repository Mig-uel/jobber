import { useState } from 'react'
import AreaChart from './AreaChart'
import BarChart from './BarChart'
import { Wrapper } from '../styled/ChartsContainer'

import PropType from 'prop-types'

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true)

  return (
    <Wrapper>
      <h4>Montly Applications</h4>
      <button type='button' onClick={() => setBarChart((prev) => !prev)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>

      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  )
}

export default ChartsContainer

ChartsContainer.propTypes = {
  data: PropType.object.isRequired,
}
