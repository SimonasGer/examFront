import { useLocation } from "react-router-dom"
import { url } from "../../utilities/backend"
import axios from "axios"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import Comments from "./Comments"
import { useNavigate } from "react-router-dom"
import "./postPage.scss"

const PostPage = () => {
    const navigate = useNavigate();
    const postId = useLocation().pathname.split("/")[2]
    const user = jwtDecode(localStorage.getItem("token")).id
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState({})
    const [likes, setLikes] = useState(0)
    const [like, setLike] = useState("black")


    useEffect(() => {
        const loadPost = async () => {
            try {
                await axios.get(`${url}/posts/${postId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                      }
                }).then((res) => {
                    setPost(res.data.data.post)
                    setLikes(res.data.data.post.likes.length)
                    let users = res.data.data.post.likes
                    console.log(res)
                    for (let i of users) {
                        if (user === i._id){
                            setLike("green")
                            break
                        }
                    }
                })
            } catch (err) {
                console.error(err);
            }
        }
        if (loading){
            loadPost()
            setLoading(false)
        }
    }, [loading, postId, user])

    const [comment, setComment] = useState({
        content: "",
        creator: jwtDecode(localStorage.getItem("token")).id,
        post: postId
    })

    const handleChange = (e)=>{
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${url}/comments`, comment,  {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
            })
        setLoading(true)
        comment.content = ""
          } catch (err) {
            console.error(err);
          }
    }

    const handleLike = async () => {
        if (like === "black"){
            setLike("green")
        } else {
            setLike("black")
        }
        try {
            await axios.post(`${url}/posts/${postId}`, {likes: user} ,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
            }).then((res) => {
                setLikes(res.data.data.post.likes.length)
            })            
        } catch (error) {
            console.error(error)
        }
      }
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`${url}/posts/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
            })
        navigate("/")
          } catch (err) {
            console.error(err);
          }
    }

    return(
        <section className="postPage">
            <h2>{post.title}</h2>
            <div className="postPage__buttons">
                {((post.creator ? post.creator.username === localStorage.getItem("username") : false) || (localStorage.getItem("role") === "admin")) && <button onClick={handleDelete}>Delete</button>}
                {(post.creator ? post.creator.username === localStorage.getItem("username") : false) && <button onClick={() => {navigate(`/edit/${post._id}`)}}>Edit</button>}
            </div>
            <div className="postPage__info">
                <p>Created by:</p>
                <a href={`/user/${post.creator ? post.creator._id : ''}`}>
                    {post.creator ? post.creator.username : 'Unknown User'}
                </a>
                <p>Category: {post.category ? post.category.category : "None"}</p>
            </div>
            <div className="postPage__image">
                <img src={post.image} alt={post.image}/>
            </div>
            <div className="postPage__description">
                <div style={{height: "auto"}}>{post.description}</div>
            </div>
            <div className="postPage__price">
                <button>{post.price} eur</button>
            </div>
            <div className="postPage__likes">
                <span onClick={handleLike} style={{ color: like, fontSize: "40pt"}}>♥</span> {likes}
            </div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div>
                        <textarea style={{height: 150, width: 400}}
                         name="content" id="content" placeholder="Comment" value={comment.content} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <button type="submit">Post Comment</button>
                    </div>
                </fieldset>
            </form>
            <article>
                {post.comments && <Comments comments={post.comments} loading={setLoading}/>}
            </article>
        </section>
    )
}

export default PostPage