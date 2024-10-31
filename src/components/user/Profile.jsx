import { url } from "../../utilities/backend"
import axios from "axios"
import { useState, useEffect } from "react"
import Post from "../main/Post"
import { jwtDecode } from "jwt-decode"
import "./profile.scss"
const Profile = () => {
    const userId = jwtDecode(localStorage.getItem("token")).id
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const [likes, setLikes] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(true)

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await axios.get(`${url}/categories`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                      }
                });
                setCategories(res.data.data.categories)
            } catch (err) {
                console.error(err);
            }
        }
        if (loading2){
            loadCategories()
            setLoading2(false)
        }
    }, [loading2])

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
                setLikes(res.data.data.user.likes)
            } catch (err) {
                console.error(err);
            }
        }
        if (loading){
            loadPosts()
            setLoading(false)
        }
    }, [loading, userId])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${url}/categories/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
            });
            setLoading2(true)
        } catch (err) {
            console.error(err);
        }
    }
    return(
        <>
        {localStorage.getItem("role") === "admin" && <section className="categories">
            <h2>Delete Categories</h2>
            <article>
            {categories.map(category => (
                <button onClick={() => {handleDelete(category._id)}}>{category.category}</button>
            ))}
            </article>
        </section>}
        <section className="posts userPosts">
            <h2>{user.username} Posts</h2>
            {posts.map(post => (
                <Post title={post.title} description={post.description} price={post.price} image={post.image} _id={post._id}/>
            ))}
        </section>
        <section className="posts userPosts">
            <h2>{user.username} Likes</h2>
            {likes.map(like => (
                <Post title={like.title} description={like.description} price={like.price} image={like.image} _id={like._id}/>
            ))}
        </section>
        </>
    )
}

export default Profile