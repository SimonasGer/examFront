import { useEffect, useState } from "react"
import axios from "axios";
import { url } from "../../utilities/backend";
import Post from "./Post";
const Posts = (props) => {
    const [posts, setPosts] = useState([])
    let _and = ""
    if (props.search.length > 0 && props.category.length > 0){
        _and = "&";
    }
    useEffect(() => {
        const loadPosts = async () => {
            try {
                const res = await axios.get(`${url}/posts?${props.search}${_and}${props.category}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                      }
                });
                setPosts(res.data.data.posts)
            } catch (err) {
                console.error(err);
            }
        }
        if (props.loading){
            loadPosts()
            props.setLoading(false)
        }
    }, [props, _and])

    return(
        <section className="d-flex flex-row flex-wrap">
            {posts.map(post => (
                <Post title={post.title} description={post.description} price={post.price} image={post.image} _id={post._id}/>
            ))}
        </section>
    )
}
export default Posts