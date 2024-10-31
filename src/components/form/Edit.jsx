import { useState, useEffect } from "react"
import axios from "axios"
import { url } from "../../utilities/backend"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom";
import "./form.scss"

const Edit = () => {
    const [categories, setCategories] = useState([])
    const postId = useLocation().pathname.split("/")[2]
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState({
        title: "",
        description: "",
        image: "",
        price: 0,
        creator: "",
        category: ""
    })

    useEffect(() => {
        const loadPost = async () => {
            try {
                await axios.get(`${url}/posts/${postId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                      }
                }).then((res) => {
                    setPost(res.data.data.post)

                })
                const res = await axios.get(`${url}/categories`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                      }
                })
                setCategories(res.data.data.categories)
            } catch (err) {
                console.error(err);
            }
        }
        if (loading){
            loadPost()
            setLoading(false)
        }
    }, [loading, postId])

    const handleChange = (e)=>{
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(post)
        try {
            await axios.post(`${url}/posts/update/${postId}`, {title: post.title, description: post.description, price: post.price, image: post.image, category: post.category}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
            });
            navigate('/');
          } catch (err) {
            console.error(err);
          }
    }
    return(
        <div className="addForm">
            <h2>Edit the post</h2>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div>
                        <input name="title" id="title" type="text" placeholder="Title" value={post.title} onChange={handleChange}/>
                        <label htmlFor="category">Categories</label>
                        <select name="category" id="category" value={post.category._id} onChange={handleChange}>
                            <option value="None">None</option>
                            {categories.map(category => (
                                <option value={category._id}>{category.category}</option>
                            ))}
                        </select>
                        <textarea name="description" id="description" placeholder="Description" value={post.description} onChange={handleChange}></textarea>
                        <input name="price" id="price" type="number" placeholder="Price" value={post.price} onChange={handleChange}/>
                        <input name="image" id="image" type="text" placeholder="Image Url" value={post.image} onChange={handleChange}/>
                        <button type="submit">Edit</button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export default Edit