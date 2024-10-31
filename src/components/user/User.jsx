import { useLocation } from "react-router-dom"
import { url } from "../../utilities/backend"
import axios from "axios"
import { useState, useEffect } from "react"
import Post from "../main/Post"
import { useNavigate } from "react-router-dom"

const User = () => {
    const navigate = useNavigate()
    const userId = useLocation().pathname.split("/")[2]
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const res = await axios.get(`${url}/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                      }
                });
                setUser(res.data.data.user)
                setPosts(res.data.data.user.posts)
            } catch (err) {
                console.error(err);
            }
        }
        if (loading){
            loadPosts()
            setLoading(false)
        }
    }, [loading, userId])

    const handleKill = async () => {
        try {
            await axios.delete(`${url}/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
            });
            navigate("/")
        } catch (err) {
            console.error(err);
        }
    }
    return(
        <section className="userPosts posts">
            {(localStorage.getItem("role") === "admin") && <button onClick={handleKill}>Delete user</button>}
            <h2>{user.username} Postings</h2>
            {posts.map(post => (
                <Post title={post.title} description={post.description} price={post.price} image={post.image} _id={post._id}/>
            ))}
        </section>
    )
}

export default User