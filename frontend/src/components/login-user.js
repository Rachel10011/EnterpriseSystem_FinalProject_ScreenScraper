import axios from "axios";

export default function loginUser(email,password){
    axios.post('http://localhost:3001/items/register', {email: email, password: password})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error)
    });
}