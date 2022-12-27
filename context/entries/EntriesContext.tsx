import { createContext } from 'react';
import { Entry } from '../../interfaces/entry';

export interface ContextProps {
     entries: Entry[];

     addNewEntry: (description: string) => void;
     onEntryUpdated: (entry: Entry, showSnacbar?: boolean) => void;
     deleteEntries: (id: string) => void;

}

export const EntriesContext = createContext({

} as ContextProps)