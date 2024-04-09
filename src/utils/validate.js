export const checkValidData = (email,password) =>{
    const isEmailValid = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]+$/.test(email);
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

    if(!isEmailValid) return "Email is Not Valid";
    if(!isPasswordValid) return "Password is not valid";

    return null;

};