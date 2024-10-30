import { useNavigate } from "react-router-dom"
import "./header.scss"
const Header = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username")
    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        localStorage.removeItem("username")
        navigate("/login")
    }
    const handlePost = () => {
        navigate("/form")
    }
    const handleMain = () => {
        navigate("/")
    }
    const handleProfile = () => {
        navigate("/profile")
    }
    const handleUsers = () => {
        navigate("/users")
    }
    return(
        <header className="header">
            <div className="header__left">
                <div>
                    {localStorage.getItem("token") && <button onClick={handleMain}>Home</button>}
                </div>
                <div>
                    {localStorage.getItem("token") && <button onClick={handlePost}>Add</button>}
                </div>
            </div>
            <div className="header__right">
                <div>
                    {localStorage.getItem("token") && <button onClick={handleUsers}>Users</button>}
                </div>
                <div>
                    {localStorage.getItem("token") && <button onClick={handleProfile}>{username}</button>}
                </div>
                <div>
                    {localStorage.getItem("token") && <button onClick={handleLogout}>Log Out</button>}
                </div>
            </div>
        </header>
    )
}

export default Header