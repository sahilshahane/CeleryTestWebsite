import Head from 'next/head'
import Card from '@mui/material/Card'
import UserDetailForm from '@/components/UserDetailForm'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()

  const redirectUserForms = (val: String) => {
    alert(val)
    router.push('/user-form')
  }

  const [isLoading, setLoading] = useState(false)

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Loader isLoading={isLoading} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <Card variant='outlined'>
            <UserDetailForm
              setLoading={setLoading as any}
              onSuccess={redirectUserForms}
              onError={(err) => alert(err)}
            />
          </Card>
        </div>
      </main>
    </>
  )
}
