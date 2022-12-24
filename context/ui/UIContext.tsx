import { createContext } from 'react';

export interface ContextProps {
     sidemenuOpen: boolean;
     isAdding: boolean;
     isDragging: boolean;


     //methods
     openSidemenu: () => void;
     closeSidemenu: () => void;
     isAddingEntry: () => void;
     isNotAddingEntry: () => void;
     startDragging: () => void;
     stopDragging: () => void;
}

export const UIContext = createContext({

} as ContextProps)