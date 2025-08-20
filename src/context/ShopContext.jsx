import React, {createContext} from 'react'
import all_product from '../Assets/Frontend_Assets/all_product'

export const Shopcontext = createContext(null);
function ShopContext(props) {

    const contextValue = {all_product};
  return (
   <Shopcontext.Provider value={contextValue} >
       {props.children}
   </Shopcontext.Provider>
    );
    };
export default ShopContext