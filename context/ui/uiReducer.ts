import { UIState } from './UIProvider';

type UIActionType = 
| {type: 'UI_OPEN_SIDEBAR'} 
| {type: 'UI_CLOSE_SIDEBAR'} 
| {type: 'UI_IS_ADDING_ENTRY'}
| {type: 'UI_IS_NOT_ADDING_ENTRY'}
| {type: 'UI_IS_STARTING_DRAGGING'}
| {type: 'UI_IS_END_DRAGGING'}

export const uiReducer = (state: UIState, action: UIActionType): UIState => {

    switch (action.type) {
        case 'UI_OPEN_SIDEBAR':
            return { ...state, sidemenuOpen: true};
        case 'UI_CLOSE_SIDEBAR':
            return { ...state,  sidemenuOpen: false};
        case 'UI_IS_ADDING_ENTRY':
            return { ...state,  isAdding: true};
        case 'UI_IS_NOT_ADDING_ENTRY':
            return { ...state,  isAdding: false};
        case 'UI_IS_STARTING_DRAGGING':
            return { ...state,  isDragging: true};
        case 'UI_IS_END_DRAGGING':
            return { ...state,  isDragging: false};
        default:
            return state;
    }

}