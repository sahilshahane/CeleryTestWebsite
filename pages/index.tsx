import Head from 'next/head'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import DatePicker from '@/components/DatePicker'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import UserDetailForm from '@/components/UserDetailForm'

export default function Home() {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <Card variant='outlined'>
            <UserDetailForm />
          </Card>
        </div>
      </main>
    </>
  )
}
