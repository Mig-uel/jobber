import { useLoaderData } from 'react-router-dom'
import { ChartsContainer, StatsContainer } from '../../components'

const Stats = () => {
  const { stats, monthlyApplications } = useLoaderData()

  return (
    <>
      <StatsContainer stats={stats} />

      {monthlyApplications?.length ? (
        <ChartsContainer data={monthlyApplications} />
      ) : (
        <h3>No data available at this time</h3>
      )}
    </>
  )
}

export default Stats
