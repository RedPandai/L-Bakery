const deliveryForm = ({ customer, phone, address}) => {
    const errors = {};
  
    if (!customer) {
      errors.customer = "Please enter your name";
    } else if (!/^[a-zA-Z\s-]+$/.test(customer)) {
      errors.customer = "Please input valid English Name";
    }
    if (!phone) {
      errors.phone = "Please input your phone number";
    }else if(!/^[\d]+$/.test(phone)){
      errors.phone = 'Please input valid phone number!'
    }
    if (!address) {
      errors.address = "Please Input your address!"
    } else if(address.length<10){
      errors.address = "Please Input valid address"
    }

    const isValid = Object.keys(errors).length === 0;
  
    return { errors, isValid };
  };
  
  export default deliveryForm;
  