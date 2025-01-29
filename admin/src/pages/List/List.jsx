import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'

const List = ({url}) => {

  // url to get the list of data in the backend
  const [list,setList] = useState([])

  const fetchList = async() =>{
    const response = await axios.get(`${url}/api/food/list`)
    if(response.data.success){
      setList(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }

  // remove the food item while clicking the "X" in the interface
  const removeFood = async(foodId) =>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <div>
      <div className="list add flex-col">
        <p>All Foods List</p>
        <div className='list-table'>
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {
          list.map((item,index)=>{
            return(
              <div key={index} className="list-table-format">
                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={()=>removeFood(item._id)} className='cursor'>x</p>
              </div>
            )
          })
          }
        </div>
      </div>

      <ToastContainer/>
    </div>
  )
}

export default List