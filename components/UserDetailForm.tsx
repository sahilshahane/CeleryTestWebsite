import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import DatePicker from '@/components/DatePicker'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import * as yup from 'yup'
import { useFormik } from 'formik'

interface IUserDetailData {
  name: String
  dob: Date
  email: String
  phoneNo: {
    countryCode: String
    number: String | number
  }
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  dob: yup.date().required('Date of Birth is required'),
  name: yup.string().required('Your Name is required'),
  phoneNo: yup.object().shape({
    countryCode: yup.string().required('Country Code is required'),
    number: yup.number().required('10 Digit Phone number is required'),
  }),
})

export default function UserDetailForm() {
  const formik = useFormik<IUserDetailData>({
    initialValues: {
      dob: new Date(),
      email: '',
      name: '',
      phoneNo: {
        countryCode: '',
        number: '',
      },
    },
    validationSchema: validationSchema,
    onSubmit: (val) => {
      alert(JSON.stringify(val, null, 2))
    },
  })

  return (
    <>
      <form method='POST' onSubmit={formik.handleSubmit}>
        <Container>
          <Stack spacing={1} py={3}>
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
              <DatePicker />
            </Box>
            <Box>
              <Stack>
                <TextField
                  label='Country Code'
                  name='countryCode'
                  variant='outlined'
                  type='text'
                  value={formik.values.phoneNo.countryCode}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNo?.countryCode &&
                    Boolean(formik.errors.phoneNo?.countryCode)
                  }
                  helperText={
                    formik.touched.phoneNo?.countryCode &&
                    formik.errors.phoneNo?.countryCode
                  }
                />
                <TextField
                  label='number'
                  name='number'
                  variant='outlined'
                  type='tel'
                  value={formik.values.phoneNo.number}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNo?.number &&
                    Boolean(formik.errors.phoneNo?.number)
                  }
                  helperText={
                    formik.touched.phoneNo?.number &&
                    formik.errors.phoneNo?.number
                  }
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
