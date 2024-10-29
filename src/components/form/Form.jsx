import { useState, useEffect } from "react"
import axios from "axios"
import { url } from "../../utilities/backend"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode";
import "./form.scss"

const Form = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState({
        title: "",
        description: "",
        image: "",
        price: 0,
        category: "",
        creator: jwtDecode(localStorage.getItem("token")).id
    })

    const handleChange = (e)=>{
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
        console.log(post)
    }

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
        if (loading){
            loadCategories()
            setLoading(false)
        }
    }, [loading])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${url}/posts`, post, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
            });
            navigate('/');
          } catch (err) {
            console.error(err);
          }
    }
    const handleSubmitCat = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${url}/categories`, {category: category}, {
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
        <>
            <form className="addForm" onSubmit={handleSubmit}>
                <h2>Add Post</h2>
                <fieldset>
                    <div>
                        <input name="title" id="title" type="text" placeholder="Title" value={post.title} onChange={handleChange}/>
                        <label htmlFor="category">Categories</label>
                        <select name="category" id="category" onChange={handleChange}>
                            <option value="None">None</option>
                            {categories.map(category => (
                                <option value={category._id}>{category.category}</option>
                            ))}
                        </select>
                        <textarea name="description" id="description" placeholder="Description" value={post.description} onChange={handleChange}></textarea>
                        <input name="price" id="price" type="number" placeholder="Price" value={post.price} onChange={handleChange}/>
                        <input name="image" id="image" type="text" placeholder="Image Url" value={post.image} onChange={handleChange}/>
                        <button type="submit">Post</button>
                    </div>
                </fieldset>
            </form>
            {(localStorage.getItem("role") === "admin") && 
            <form className="addForm" onSubmit={handleSubmitCat}>
                <h2>Add Category</h2>
                <fieldset>
                    <div>
                        <input name="category" id="category" type="text" placeholder="Category" value={category} onChange={(e) => {setCategory(e.target.value)}}/>
                        <button type="submit">Add category</button>
                    </div>
                </fieldset>
            </form>}
        </>
    )
}

export default Form