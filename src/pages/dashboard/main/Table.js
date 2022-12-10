import { Check, Edit, TramSharp } from '@mui/icons-material'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from '@mui/material'
import React from 'react'

const row = (
  x,
  i,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing
) => {
  const currentlyEditing = editIdx === i
  return (
    <TableRow key={`tr-${i}`} selectable={false}>
      {header.map((y, k) => (
        <TableCell key={`trc-${k}`}>
          {currentlyEditing ? (
            <TextField
              name={y.prop}
              onChange={e => handleChange(e, y.prop, i)}
              value={x[y.prop]}
            />
          ) : (
            x[y.prop]
          )}
        </TableCell>
      ))}
      <TableCell>
        {currentlyEditing ? (
          <Check onClick={() => stopEditing()} />
        ) : (
          <Edit onClick={() => startEditing(i)} />
        )}
      </TableCell>
      <TableCell>
        <TramSharp onClick={() => handleRemove(i)} />
      </TableCell>
    </TableRow>
  )
}

export default ({
  data,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing
}) => (
  <Table>
    <TableHead>
      <TableRow>
        {header.map((x, i) => (
          <TableHead key={`thc-${i}`}>{x.name}</TableHead>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((x, i) =>
        row(
          x,
          i,
          header,
          handleRemove,
          startEditing,
          editIdx,
          handleChange,
          stopEditing
        )
      )}
    </TableBody>
  </Table>
)
