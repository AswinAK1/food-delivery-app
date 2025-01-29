import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { storeContext } from '../../context/StoreContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'


const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(storeContext)

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    pinCode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async(event) =>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }
    console.log(orderData);
    
    try {
      const response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
      if(response.data.success){
        const {session_url} = response.data;
        window.location.replace(session_url)
      }
      else{
        alert("Error placing order");
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  const navigate = useNavigate()

  useEffect(()=>{
    if (!token) {
      // toast.error("Login first");
      // setTimeout(() => {
        navigate('/cart');
      // }, 2000);
    }
    else if(getTotalCartAmount()===0){
      // toast.error("Add some product");
      // setTimeout(() => {
      navigate('/');
    // }, 2000);
    }
  },[token])



  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' value={data.firstName} onChange={onChangeHandler} type="text" placeholder='First Name'/>
          <input required name='lastName' value={data.lastName} onChange={onChangeHandler} type="text" placeholder='Last Name'/>
        </div>
        <input required name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='Email Address'/>
        <input required name='street' value={data.street} onChange={onChangeHandler} type="text" placeholder='Street'/>
        <div className="multi-fields">
          <input required name='city' value={data.city} onChange={onChangeHandler} type="text" placeholder='City'/>
          <input required name='state' value={data.state} onChange={onChangeHandler} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input required name='pinCode' value={data.pinCode} onChange={onChangeHandler} type="text" placeholder='Pin code'/>
          <input required name='country' value={data.country} onChange={onChangeHandler} type="text" placeholder='Country'/>
        </div>
        <input required name='phone' value={data.phone} onChange={onChangeHandler} type="Number" placeholder='Phone Number' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
        <div>
          <div className="cart-total-details">
            <p>Sub Total</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()===0?0:2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
          </div>
        </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
      <ToastContainer/>
    </form>
  )
}

export default PlaceOrder