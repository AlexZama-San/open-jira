import { Button } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import {Box, TextField} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ChangeEvent, useState, useContext } from 'react';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';

export const NewEntry = () => {

    const {addNewEntry} = useContext(EntriesContext)

    const {isAddingEntry, isNotAddingEntry, isAdding} = useContext(UIContext)

    const [inputValue, setInputValue] = useState('')
    const [touched, setTouched] = useState(false)

    const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const onSave = () => {
        if (inputValue.length === 0) return

        addNewEntry(inputValue)
        isNotAddingEntry()
        setTouched(false)
        setInputValue('')
    }

  return (
    <Box sx={{marginBottom: 2, paddingX: 1}}>

        {
        isAdding ? (<>
            <TextField fullWidth sx={{marginTop: 2, marginBottom: 1}}
                placeholder='Nueva tarea'
                autoFocus
                multiline
                label='nueva tarea'
                helperText='Escribe una nueva tarea'
                error={touched && inputValue.length <= 0}
                value={inputValue}
                onChange={onTextFieldChange}
                onBlur={() => setTouched(true)}

            />



        <Box display='flex' justifyContent={'space-between'}>
            <Button
                variant='outlined'
                color='secondary'
                endIcon={<SaveOutlinedIcon />}
                onClick={onSave}
            >
                Guardar
            </Button>
            <Button
                variant='outlined'
                onClick={isNotAddingEntry}
            >
                Cancelar
            </Button>
        </Box>
        </>): (
            <Button
            startIcon={<AddCircleOutlineIcon />}
            fullWidth
            variant='outlined'
            onClick={isAddingEntry}
            >
             Agregar tarea

            </Button>
        )
        }
    
    

        
        
    </Box>
  )
}
