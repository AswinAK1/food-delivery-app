import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const storeContext = createContext(null)

const StoreContextProvider = (props) =>{

  const [cartItems,setCartItems] = useState({})
  const url = "http://localhost:4000"
  const [token,setToken] = useState("")
  const [food_list,setFood_list] = useState([])

  // add products in to the cart
  const addToCart =async (itemId) =>{
    if(!cartItems[itemId]){
      setCartItems((prev)=>({...prev,[itemId]:1}))
    }
    else{
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    if(token){
      await axios.post(`${url}/api/cart/add`,{itemId},{headers:{token}})
    }
  }

  // remove the added product
  const removeFromCart = async(itemId) =>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if(token){
      await axios.post(`${url}/api/cart/remove`,{itemId},{headers:{token}})
    }
  }

  const getTotalCartAmount = () =>{
    let totalAmount = 0;
    for(const item in cartItems){
      if(cartItems[item]>0){
        let itemInfo = food_list.find((product)=>product._id === item)
        totalAmount += itemInfo.price*cartItems[item]
      }
    }
    return totalAmount;
  }

  // api call for fetching the food details
  const fetchFoodList = async() =>{
    const response = await axios.get(`${url}/api/food/list`)
    setFood_list(response.data.data)
    
  }

  // stop the cart item remove while refresh the page
  const loadCartData = async(token)=>{
    const response = await axios.post(`${url}/api/cart/get`,{},{headers:{token}})
    setCartItems(response.data.cartData)
  }



  // fetch food data to the server
  useEffect(()=>{
    const loadData = async() =>{
      await fetchFoodList()
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData()
  },[])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  }
  return(
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  )
}

export default StoreContextProvider