const validateForm = ({ name, email, message }) =>{
  const errors = {};

  if (!name) {
    errors.name = "Please enter a name";
  }else if(!/^[a-zA-Z\s-]+$/.test(name)){
    errors.name = "Please input valid English Name";
  }

  if (!email) {
    errors.email = "Please enter an email address";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (message.length<1) {
    errors.message = "Please input your message!";
  }else if(/^[\s]/.test(message)){
    errors.message = "Please do not use white space!";
  }

  const isValid = Object.keys(errors).length === 0;

  return { errors, isValid };
}

export default validateForm;
