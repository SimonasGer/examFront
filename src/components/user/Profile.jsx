import { url } from "../../utilities/backend"
import axios from "axios"
import { useState, useEffect } from "react"
import Post from "../main/Post"
import { jwtDecode } from "jwt-decode"

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
        <section className="container d-flex flex-column justify-content-center align-items-center ">
            <h2 className="my-5 fs-1">Categories</h2>
            <article className="d-flex w-100 flex-wrap">
            {categories.map(category => (
                <button className="m-3" onClick={() => {handleDelete(category._id)}}>{category.category}</button>
            ))}
            </article>
        </section>
        <section className="container d-flex flex-column justify-content-center align-items-center ">
            <h2 className="my-5 fs-1">{user.username} Posts</h2>
            <article className="d-flex w-100 flex-wrap">
            {posts.map(post => (
                <Post title={post.title} description={post.description} price={post.price} image={post.image} _id={post._id}/>
            ))}
            </article>
        </section>
        <section className="container d-flex flex-column justify-content-center align-items-center ">
            <h2 className="my-5 fs-1">{user.username} Likes</h2>
            <article className="d-flex w-100 flex-wrap">
            {likes.map(like => (
                <Post title={like.title} description={like.description} price={like.price} image={like.image} _id={like._id}/>
            ))}
            </article>
        </section>
        </>
    )
}

export default Profile