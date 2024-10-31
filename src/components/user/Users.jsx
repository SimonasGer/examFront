import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../utilities/backend";
import { useNavigate } from "react-router-dom";
import "./users.scss"
const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const res = await axios.get(`${url}/users`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                      }
                });
                setUsers(res.data.data.users)
            } catch (err) {
                console.error(err);
            }
        }
        if (loading){
            loadUsers()
            setLoading(false)
        }
    }, [loading])

    const handleUser = (id) => {
        navigate(`/user/${id}`)
    }
    return(
        <section className="users">
            {users.map(user => (
                    <button onClick={() => {handleUser(user._id)}}>{user.username}</button>
                ))}
        </section>
    )
}

export default Users