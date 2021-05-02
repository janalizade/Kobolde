import React,{createContext, useState } from 'react';
import { Button } from '@material-ui/core/Button';


const ItemList=()=>{

   const[items,setitems]=useState([
       {name:'Rutger',email:'Rutger@Kobolde.se'}
   ]);
   const addItem=(email)=>{setitems([...items,{name:'Niloo',email:email}]);}
   return (
       <div>
           <ul>
               {items.map(item=>{return(
                    <li key={item.name}>{item.email}                  
                    </li>

               );})}
           </ul>
           
           <SignIn addItem={addItem}/>
       </div>
   );
}
export default ItemList;