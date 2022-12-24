import { EntriesState } from './EntriesProvider';
import { Entry } from '../../interfaces/entry';

type EntriesActionType = 
| {type: 'Entry_ADD_ENTRY', payload: Entry} 
| {type: 'Entry_UPDATE_ENTRY', payload: Entry}

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

    switch (action.type) {
        case 'Entry_ADD_ENTRY':
            return { ...state, entries: [...state.entries, action.payload]};
        case 'Entry_UPDATE_ENTRY':
            return { ...state, entries: state.entries.map(entry => {
                if (entry._id === action.payload._id) {
                    entry.status = action.payload.status;
                    entry.description = action.payload.description;
                }
                return entry;
            })}
        default:
            return state;
    }

}