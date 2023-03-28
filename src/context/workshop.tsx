//create context
//import it on an item where we get value and consder it as aparent
//wrapit the parent component wiht the theme context , pass the values that needs to be shared down the line
//where ever needed use the values, by useState on the values.
import IWorkshop from "../models/IWorkshop";
import { createContext, useContext } from "react";


export type WorkshopContextType = {
    workshops : IWorkshop[],
    deleteWorkshopWithId : Function,
    addWorkshop : Function,
    updateWorkshopWithId : Function,
    workshopBeingEdited: IWorkshop | null,
    setWorkshopBeingEdited: Function
}

const WorkshopContext = createContext<WorkshopContextType>({
    workshops : [] as IWorkshop[],
    deleteWorkshopWithId : () =>{},
    addWorkshop : () => {},
    updateWorkshopWithId : () => {},
    workshopBeingEdited : null,
    setWorkshopBeingEdited: () =>{}

});

export const useWorkshops =  () =>  { 
    return useContext(WorkshopContext);
 }

export default WorkshopContext;