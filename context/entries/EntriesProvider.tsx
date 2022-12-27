import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { Entry } from '../../interfaces/entry';
import { EntriesContext } from './EntriesContext';
import { entriesReducer } from './entriesReducer';
import entriesApi from '../../apis/entriesApi';
import { useSnackbar } from 'notistack';

export interface EntriesState {
    entries: Entry[
    ];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

export const EntriesProvider: FC<PropsWithChildren> = ({children}) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
    const {enqueueSnackbar} = useSnackbar()

    const addNewEntry = async(description: string) => {
            const {data} = await entriesApi.post<Entry>('/entries', {description})

            dispatch({type: 'Entry_ADD_ENTRY', payload: data})
    }

    const onEntryUpdated = async(entry: Entry, showSnackbar = false) => {
        try {
            const {data} = await entriesApi.put(`/entries/${entry._id}`, entry)

            dispatch({type: 'Entry_UPDATE_ENTRY', payload: data})

            if(showSnackbar){
            enqueueSnackbar('Entrada actualizada', {
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }})
            }
            
        } catch (error) {
            console.log({error});
        }
    }

    const refreshEntries = async() => {
        const {data} = await entriesApi.get<Entry[]>('/entries')
        dispatch({type: 'Entry_REFRESH_ENTRIES', payload: data})
    }

    useEffect(() => {
      refreshEntries()
    }, [])

    const deleteEntries = async(id: string) => {
        try {
            
            const {data} = await entriesApi.delete(`/entries/${id}`)
            dispatch({type: 'Entry_DELETE_ENTRY', payload: data})

            enqueueSnackbar('Entrada eliminada', {
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }})

        } catch (error) {
            console.log(error)
        }
    }


  return (
    <EntriesContext.Provider value={{
        ...state,

        addNewEntry,
        onEntryUpdated,
        deleteEntries
    }}>
        {children}
    </EntriesContext.Provider>
  )
}