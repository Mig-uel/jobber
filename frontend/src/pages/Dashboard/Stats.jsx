import { ChartsContainer, StatsContainer } from '../../components'
import { useQuery } from '@tanstack/react-query'
import { statsQuery } from '../../loaders/stats.loader'

const Stats = () => {
  const {
    data: { stats, monthlyApplications },
  } = useQuery(statsQuery)

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
