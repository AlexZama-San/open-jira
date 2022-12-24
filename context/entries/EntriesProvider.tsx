import { FC, PropsWithChildren, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Entry } from '../../interfaces/entry';
import { EntriesContext } from './EntriesContext';
import { entriesReducer } from './entriesReducer';

export interface EntriesState {
    entries: Entry[
    ];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

export const EntriesProvider: FC<PropsWithChildren> = ({children}) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({type: 'Entry_ADD_ENTRY', payload: newEntry})
    }

    const onEntryUpdated = (entry: Entry) => {
        dispatch({type: 'Entry_UPDATE_ENTRY', payload: entry})
    }


  return (
    <EntriesContext.Provider value={{
        ...state,

        addNewEntry,
        onEntryUpdated
    }}>
        {children}
    </EntriesContext.Provider>
  )
}