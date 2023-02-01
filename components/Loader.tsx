import { useState, CSSProperties } from 'react'
import ClipLoader from 'react-spinners/RingLoader'

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
}

interface ILoader {
  isLoading: Boolean
}

function Loader({ isLoading }: ILoader) {
  return (
    isLoading && (
      <div className='full-page-loading'>
        <div
          style={{
            width: '100vw',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            position: 'fixed',
            backgroundColor: 'black',
            opacity: 0.1,
          }}
        ></div>
        <div
          style={{
            width: '100vw',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <ClipLoader
            color='red'
            loading={Boolean(isLoading)}
            cssOverride={override}
            size={150}
            aria-label='Loading Spinner'
          />
        </div>
      </div>
    )
  )
}

export default Loader
