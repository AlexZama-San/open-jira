import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext } from './UIContext';
import { uiReducer } from './uiReducer';

export interface UIState {
    sidemenuOpen: boolean;
    isAdding: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAdding: false,
    isDragging: false
}

export const UIProvider: FC<PropsWithChildren> = ({children}) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const openSidemenu = () => {
        dispatch({type: 'UI_OPEN_SIDEBAR'})
    }
    const closeSidemenu = () => {
        dispatch({type: 'UI_CLOSE_SIDEBAR'})
    }
    const isAddingEntry = () => {
        dispatch({type: 'UI_IS_ADDING_ENTRY'})
    }
    const isNotAddingEntry = () => {
        dispatch({type: 'UI_IS_NOT_ADDING_ENTRY'})
    }
    const startDragging = () => {
        dispatch({type: 'UI_IS_STARTING_DRAGGING'})
    }
    const stopDragging = () => {
        dispatch({type: 'UI_IS_END_DRAGGING'})
    }


  return (
    <UIContext.Provider value={{
        ...state,
        openSidemenu, closeSidemenu, isAddingEntry, isNotAddingEntry, startDragging, stopDragging
    }}>
        {children}
    </UIContext.Provider>
  )
}
