import React, { useState ,useContext, useEffect } from 'react'
import './MyOrders.css'
import { storeContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/frontend_assets/assets'

const MyOrders = () => {

  const {url,token} = useContext(storeContext)
  const [data,setData] = useState([])

  const fetchOrders = async() =>{
    const response = await axios.post(`${url}/api/order/userOrders`,{},{headers:{token}});
    setData(response.data.data);
    console.log(response.data.data);
    
  }

  useEffect(()=>{
    if(token){
      fetchOrders()
    }
  },[token])


  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {
          data.map((order,index)=>{
            return(
              <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="" />
                <p>{order.items.map((item,index)=>{
                  if(index === order.items.length-1){
                    return item.name+" X "+item.quantity
                  }
                  else{
                    return item.name+" X "+ item.quantity+" , "
                  }
                })}</p>
                <p>${order.amount}.00</p>
                <p>Item: {order.items.length}</p>
                <p><span>&#x25cf;</span><b>&nbsp;&nbsp;{order.status}</b></p>
                <button onClick={fetchOrders}>Track Order</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MyOrders