
import { useWorkshops }  from '../context/workshop';
import { useEffect, useState } from 'react';
import WorkshopContext from '../context/workshop';
import IWorkshop from '../models/IWorkshop';
import WorkshopListItem from './WorkshopListItem';

type Props = {
    format : "compact" | "expanded",
    error : Error | null,
    x : number,
    loading : boolean
};
const WorkshopList = ( { format, x, error ,loading } : Props) => {
    const { workshops } = useWorkshops();

    const [ filteredWorkshops, setFilteredWorkshop] = useState([] as IWorkshop[]);

    const [ searchKey, setSearchkey] = useState('');


  
    // const filter = () => {
        
    //     const filteredWorkshops = workshops.filter( workshop => {
    //         if (workshop.name) 
    //             return ( workshop.name.includes(searchKey) ) 
    //     });
    //     // console.log('search key' , searchKey);
    //     setFilteredWorkshop(filteredWorkshops);
    // };

    const filter = () => {
        const filteredWorkshops = workshops.filter( workshop => workshop.name.includes( searchKey ) );
        setFilteredWorkshop( filteredWorkshops );
    };

    useEffect(
        filter,
        [ searchKey, workshops ]
    );
    const element = (
        <>
        <div className="container my-2">
            <div className="row my-2">
              <div className="col-8 md-8">
              {
                <div className="search">
                    <label htmlFor="input-element">
                        Enter your search here :
                    </label>

                    <input
                        value={searchKey}
                        onChange= {(event) => setSearchkey(event.target.value)}
                    />
                    <hr />
                    Search text : {searchKey}
                </div>
            }

            {
                <div className="row">
                    Number of workshops are {filteredWorkshops.length}
                </div>
            }

            {
                <div>
                    {
                        filteredWorkshops.map( 
                            workshop => (
                                <WorkshopListItem 
                                key={workshop.id}
                                workshop={workshop} 
                                />
                            )
                        )
                    }
                </div>
            }
              </div>

            </div>
            </div>
        
            
        </>
    );
    return element
}


export default WorkshopList;
