import styled from 'styled-components'

export const Wrapper = styled.section`
  margin-top: 4rem;

  h4 {
    margin-top: 1.5rem;
    text-transform: none;
  }

  h2 {
    text-transform: none;
  }

  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }

  @media (min-width: 1120px) {
    .jobs {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`
