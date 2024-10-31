import { useNavigate } from "react-router-dom"
import "./post.scss"
const Post = (props) => {
    const navigate = useNavigate();
    const handleExpand = () => {
        navigate(`/posting/${props._id}`)
    }
    return(
        <article className="post">
            <img src={props.image} alt=""></img>
            <div>
                <h5>{props.title}</h5>
                <p>{props.description}</p>
                <div>
                    <div>{props.price}$</div>
                    <button onClick={handleExpand}>more info</button>
                </div>
            </div>
        </article>
    )
}
export default Post