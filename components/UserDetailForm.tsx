//@ts-nocheck

import { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import DatePicker from '@/components/DatePicker'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import * as yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import Loader from '@/components/Loader'

interface IUserDetailData {
  name: String
  dob: Date
  email: String
  phoneNo: String
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  dob: yup.date().required('Date of Birth is required'),
  name: yup.string().required('Your Name is required'),
  phoneNo: yup.string().required('Phone no. is required'),
})

interface IUserDetailForm {
  onSuccess: (val: any) => void
  onError: (err: String) => void
  setLoading: (prev: Boolean) => void
}

export default function UserDetailForm({
  onSuccess,
  onError,
  setLoading,
}: IUserDetailForm) {
  const formik = useFormik<IUserDetailData>({
    initialValues: {
      dob: new Date(),
      email: '',
      name: '',
      phoneNo: '',
    },
    validationSchema: validationSchema,
    onSubmit: (val, formikHelpers) => {
      setLoading(true)
      axios
        .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/user-form', val, {
          method: 'POST',
        })
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(err?.response?.data || 'Something went wrong'))
        .finally(() => setLoading(false))
    },
  })

  return (
    <>
      <form method='POST' onSubmit={formik.handleSubmit}>
        <Container>
          <Stack spacing={1.5} py={3}>
            <Box>
              <FormControl>
                <TextField
                  label='Name'
                  name='name'
                  variant='outlined'
                  type='text'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </FormControl>
            </Box>
            <Box>
              <TextField
                label='Email'
                name='email'
                variant='outlined'
                type='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>
            <Box>
              <DatePicker
                onChange={(date) => formik.setFieldValue('dob', date)}
              />
            </Box>
            <Box>
              <Stack>
                <TextField
                  label='Phone no.'
                  name='phoneNo'
                  variant='outlined'
                  type='text'
                  value={formik.values.phoneNo}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNo && Boolean(formik.errors.phoneNo)
                  }
                  helperText={formik.touched.phoneNo && formik.errors.phoneNo}
                />
              </Stack>
            </Box>
            <Box>
              <Button type='submit' variant='contained'>
                Submit
              </Button>
            </Box>
          </Stack>
        </Container>
      </form>
    </>
  )
}
