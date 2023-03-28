import axios from "axios";
import IWorkshop from "../models/IWorkshop";

const getWortkshops = async ()  => {
    const response = await axios.get(`http://localhost:3000/workshops`);
    // console.log(response);
    return response.data as IWorkshop[];
}

const postWorkshop = async (workshop : Partial<IWorkshop>) => {
    const response = await axios.post(`http://localhost:3000/workshops`, workshop , {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response.data);
    return response.data as IWorkshop;

}

const patchWorkshop = async (id : number, workshop : Partial<IWorkshop>) => {
    console.log( " Update Request")
    try{
        const response = await axios.patch(`http://localhost:3000/workshops/${id}`, workshop, {
        headers : {
            'Content-Type' :  'application/json'
        }
    })
    return response.data as IWorkshop;
    } catch ( error ) {
        console.error(error);
        alert( (error as Error).message);
        throw error;
        
    }
    
}

const deleteWorkshop = async (workshopId  : number) => {
    await axios.delete(`http://localhost:3000/workshops/${workshopId}`)
}

export {
    getWortkshops,
    postWorkshop,
    deleteWorkshop,
    patchWorkshop
}