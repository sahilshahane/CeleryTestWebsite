import { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Stack from '@mui/material/Stack'

interface IDatePicker {
  onChange: (date: Date) => void
}

export default function DatePicker({ onChange }: IDatePicker) {
  const [value, setValue] = useState<Dayjs | null>(dayjs())

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue)
    newValue && onChange(newValue.toDate())
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <MobileDatePicker
            label='Date of Birth'
            inputFormat='MM/DD/YYYY'
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField name='dob' {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </>
  )
}
