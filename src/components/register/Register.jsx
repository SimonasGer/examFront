import { useState } from "react"
import axios from "axios"
import { url } from "../../utilities/backend"
import { useNavigate } from "react-router-dom"
import "./register.scss"
const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPasword: ""
    })
    const [error, setError] = useState("")

    const handleChange = (e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/users/register`, user);
            console.log(res)
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.data.username )
            localStorage.setItem('role', res.data.data.role )
            navigate('/');
          } catch (err) {
            console.error(err);
            setError("An error has occured");
          }
    }
    return(
        <form className="authForm" onSubmit={handleSubmit}> 
            <h2>Register</h2>
            <fieldset>
                    <div>
                        <input required type="text" name="username" id="username" placeholder="Username" value={user.username} onChange={handleChange}/>
                    </div>
                    <div>
                        <input required type="email" name="email" id="email" placeholder="Email" value={user.email} onChange={handleChange}/>
                    </div>
                    <div>
                        <input required type="password" name="password" id="password" placeholder="Password" value={user.password} onChange={handleChange}/>
                    </div>
                    <div>
                        <input required type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" value={user.confirmPassword} onChange={handleChange}/>
                    </div>
                    <div >
                        <button type="submit">Register</button>
                    </div>
                    <div>
                        <a href="/login">Have an account?</a>
                    </div>
                    <div>{error}</div>
            </fieldset>
        </form>
    )
}

export default Register