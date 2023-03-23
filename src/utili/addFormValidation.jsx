const addFormValidation = ({ title, file, pricesInput, desc, extra }) => {
  const errors = {};

  if (!title) {
    errors.tittle = "Please enter a product name";
  } else if (!/^[a-zA-Z\s-]+$/.test(title)) {
    errors.title = "Please input valid English Name";
  }

  if (!file) {
    errors.file = "Please add your product image";
  }

  if (desc.length < 5) {
    errors.desc = "Please input some description";
  } else if (/^[\s]/.test(desc)) {
    errors.desc = "Please do not use white space!";
  }
  if (!pricesInput) {
    errors.prices = "Please input all 3 sizes product prices";
  }else if(pricesInput>100){
    errors.prices = 'Please input valid prices!'
  }
  if (!extra.text) {
    errors.extra = "Please Input Valid Extra!"
  } else if(!/^[a-zA-Z\s-]+$/.test(extra.text)){
    errors.extra = "Please Input Valid Extra Name!"
  }
  if(!extra.price){
    errors.extra = 'Please Input Valid Extra Price!'
  }else if(extra.price<0 || extra.price>10){
    errors.extra = 'Please Input Valid Extra Price!'
  }
  const isValid = Object.keys(errors).length === 0;

  return { errors, isValid };
};

export default addFormValidation;
