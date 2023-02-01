import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  getUserFormList,
  getTotalUserEntries,
  IAPIResponse,
} from '@/libs/helpers'
import TablePagination from '@mui/material/TablePagination'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Loader from '@/components/Loader'

export default function UserFormList() {
  const [rows, setRows] = useState<IAPIResponse>([])
  const [totalEntries, setTotalEntries] = useState(0)
  const [page, setPage] = useState({
    pageNo: 1,
    per_page: 5,
  })
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getTotalUserEntries()
      .then((res) => {
        if (typeof res === 'number') setTotalEntries(res || 0)
      })
      .catch((err) =>
        alert(
          'Something went wrong while retrieving Total count of User Form entries'
        )
      )
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    setLoading(true)
    getUserFormList(page)
      .then((res) => {
        if (typeof res === 'object') setRows(res)
      })
      .catch((err) =>
        alert('Something went wrong while retrieving List of User Form Entries')
      )
      .finally(() => setLoading(false))
  }, [page])

  return (
    <>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
        }}
      >
        <Loader isLoading={isLoading} />
        <TableContainer
          component={Paper}
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <Grid
            container
            direction={'column'}
            justifyContent='space-between'
            wrap='nowrap'
            sx={{
              width: '100%',
              height: '100%',
            }}
          >
            <Grid item>
              <Table aria-label='User Form List' stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align='right'>Email</TableCell>
                    <TableCell align='right'>Date of Birth</TableCell>
                    <TableCell align='right'>Phone no</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, idx) => (
                    <TableRow
                      key={idx}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        {row.name}
                      </TableCell>
                      <TableCell align='right'>{row.email}</TableCell>
                      <TableCell align='right'>{row.dob}</TableCell>
                      <TableCell align='right'>{row.phoneNo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>

            <Grid item>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component='div'
                count={totalEntries}
                rowsPerPage={page.per_page}
                page={page.pageNo - 1}
                onPageChange={(_, pageNo) =>
                  setPage({
                    ...page,
                    pageNo: pageNo + 1,
                  })
                }
                onRowsPerPageChange={(evt) => {
                  setPage({
                    ...page,
                    per_page: Number(evt.target.value),
                  })
                }}
              />
            </Grid>
          </Grid>
        </TableContainer>
      </Box>
    </>
  )
}
