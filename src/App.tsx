import React, { useState, useEffect } from 'react';
import IWorkshop from './models/IWorkshop';
// import WorkshopContext from './src/context/WorkshopContext';
import WorkshopContext, { WorkshopContextType } from './context/workshop';
import { getWortkshops } from './services/workshop';
import WorkshopList from './components/WorkshopList';
import AddEditWorkshop from './components/AddEditWorkshop';




function App() {

  const[ workshops, setWorkshops] = useState([] as IWorkshop[]);
  const[ error, setError] = useState<Error | null>(null);
  const[ loading, setLoading] = useState<boolean>(true)
  const[ workshopBeingEdited, setWorkshopBeingEdited] = useState<IWorkshop | null>(null);
  const format = "compact";


useEffect(
    ()=>{
      getWortkshops()
        .then(
          (data) => {
            setWorkshops(data);
          }
        )
        .catch(
          (error : Error ) => {
            setError(error);
          }
          )
        .finally(
          () => {
            setLoading(false);
          }
        );
  },
  []
);


const deleteWorkshopWithId  = (id : number) => {
  const filteredWorshop = workshops.filter(workshop => workshop.id != id)
  setWorkshops(filteredWorshop);
}

const addWorkshop = (workshop : IWorkshop) => {
    setWorkshops([
      ...workshops,
      workshop
    ])
}

const updateWorkshopWithId = ( id: number, workshop :IWorkshop) => {
  const updatedWorkshop = workshops.map( (work) => work.id !== id ? work : workshop )
  setWorkshops(updatedWorkshop);
}

const value : WorkshopContextType= {
  workshops, 
  deleteWorkshopWithId, 
  addWorkshop,
  workshopBeingEdited,
  setWorkshopBeingEdited,
  updateWorkshopWithId
 
}

const element = (
    <>
      <WorkshopContext.Provider value = {value}>
        <div className="row">
          <div className="col-6 md-6"></div>
            <div className="col-6 md-6">
              Workshop Lists
            </div>
        </div>


          <div className="container my-2">
            <div className="row my-2">
              <div className="col-8 md-8">
                <WorkshopList
                format={format}
                x = {100}
                error = {error}
                loading = {loading}



                />
              </div>

              <div className="col-4 md-4">
                <AddEditWorkshop/>
              </div>
            </div>
            </div>

          

      </WorkshopContext.Provider>
    </>
);
  

return ( element );
}

export default App;
