'use client'

import { useEffect,useState } from "react";

const page = () => {
    
    const [dishes, setDishes] = useState([]);
    const [dish,setDish]=useState('');
    const [isEditing,setIsediting]=useState(false);
    const [editDish,seteditDish]=useState('');
    const [editId,seteditId]=useState('');

    const getDishes = async () => {
        try
        {
            const dish=await fetch('http://localhost:5000/api/dishes');
            const data=await dish.json();
            setDishes(data);
        }
        catch(error)
        {
            console.error('Failed to fetch dishes'+error);
        }
    }
    
    useEffect(() => {
        getDishes();
    },[])
    
    const addDish = async () => {
        try
        {
            const res = await fetch('http://localhost:5000/api/add-dish', {
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify({
                    dish:dish
                })
            });
            const data=await res.json();
            getDishes();
            setDish("");
            alert(data.message);
        }
        catch(error)
        {
            alert("Failed to add dish"+error);
        }
    }

    const DeleteDish = async (id) => {
        try
        {
            const res=await fetch(`http://localhost:5000/api/delete-dish/${id}`,{
                method:"DELETE",
            });
            const response=await res.json();
            alert(response.message);
            getDishes();
        }
        catch(error)
        {
            alert("Failed to delete dish"+error);
        }
    }

    const updateDish = async () => {
        try
        {
            const res=await fetch(`http://localhost:5000/api/update-dish/${editId}`,{
                method:'PATCH',
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify({
                    dish:editDish
                })
            });
            const data=await res.json();
            getDishes();
            setIsediting(false);
            alert(data.message);
        }
        catch(error)
        {
            alert("Failed to update dish"+error);
        }
    }

  return (
    <main className="h-screen flex justify-center items-center">        
        <div className="bg-gray-600 p-5 rounded-xl w-1/2">
            <div className="space-x-2 space-y-2">
                <label htmlFor="dish">Dish:</label>
                <input type="text" onChange={(e) => setDish(e.target.value)} className="p-2 w-1/2 bg-gray-500 rounded-xl" value={dish} name="dish" id="dish" placeholder="Add your dish" />
                <button className="bg-gray-500 p-2 rounded-xl" onClick={addDish}>Add Dish</button>
                {
                    isEditing && (
                        <div className="space-x-2">
                            <label htmlFor="dish">Update Dish:</label>
                            <input className="p-2 w-1/2 bg-gray-500 rounded-xl" onChange={(e) => seteditDish(e.target.value)} value={editDish} type="text" placeholder="Update your dish"/> 
                            <button className="bg-gray-500 p-2 rounded-xl" onClick={updateDish}>Update dish</button>
                            <button className="bg-red-500 p-2 rounded-xl" onClick={(e) => setIsediting(false)}>Cancel</button>
                        </div>
                    )
                }
            </div>
        <div>
            
            <div className="text-3xl my-3">Dishes</div>
            <div className="space-y-3">
                {
                    dishes.map((item) => 
                        <div key={item._id} className="flex justify-between">
                            <div>{item.dish}</div>
                            <div className="flex space-x-2">
                                <button onClick={() => DeleteDish(item._id)} className="bg-red-600 rounded-xl px-2 text-sm">Delete</button>
                                <button className="bg-green-700 rounded-xl px-2 text-sm" onClick={() => { 
                                    setIsediting(true);
                                    seteditDish(item.dish);
                                    seteditId(item._id);
                                    }}>Update Dish</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
        </div>

    </main>
  )
}

export default page