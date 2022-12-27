import { Layout } from '../../components/layouts/layout';
import { capitalize, Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { EntryStatus, Entry } from '../../interfaces/entry';
import { useState, ChangeEvent, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next'
import { getEntryByID } from '../../database/dbEntries';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { useRouter } from 'next/router';
import { getFormatDistanceToNow } from '../../utils/dateFunctions';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'completed'];

interface Props {
    entry: Entry
}

export const EntryPage: FC<Props> = ({entry}) => {

    const router = useRouter()

    const { onEntryUpdated, deleteEntries } = useContext(EntriesContext)

    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState(false)

    const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus)
    }
    const onSave = () => {
        if(inputValue.trim().length <= 0) return

        const newEntry: Entry = {
            ...entry,
            description: inputValue,
            status
        }

        onEntryUpdated(newEntry, true)
    }

    const onDelete = () => {
        deleteEntries(entry._id)
        router.push('/')
    }

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  return (
    <Layout title={inputValue.substring(0,20) + '...'}>
        <Grid container justifyContent='center' sx={{marginTop: 2}}>
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader
                        title={`Entrada: ${inputValue}`}
                        subheader={getFormatDistanceToNow(entry.createdAt)}
                    />
                    <CardContent>
                        <TextField sx={{marginTop: 2, marginBottom: 1}}
                        fullWidth
                        placeholder='Nueva Entrada'
                        autoFocus
                        multiline
                        label='Nueva Entrada'
                        value={inputValue}
                        onChange={onTextFieldChange}
                        helperText={isNotValid && 'Escribe una nueva entrada'}
                        onBlur={() => setTouched(true)}
                        error={isNotValid}
                        />

                        <FormControl>
                            <FormLabel>
                                Estado: 
                            </FormLabel>
                            <RadioGroup row value={status} onChange={onStatusChange}>
                                {
                                    validStatus.map((status) => (
                                        <FormControlLabel key={status} value={status} control={<Radio/>} label={capitalize(status)} />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                        <Button
                            startIcon={<SaveOutlinedIcon />}
                            variant='contained'
                            fullWidth
                            onClick={onSave}
                            disabled={inputValue.length <= 0}
                        >
                            Guardar
                        </Button>
                    <CardActions/>
                        
                </Card>
            </Grid>
        </Grid>

        <IconButton sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: 'error.dark',
            }}
            onClick={onDelete}
        >
            <DeleteOutlineIcon />
        </IconButton>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
    const { id } = ctx.params as { id: string }

    const entry = await getEntryByID(id)

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage