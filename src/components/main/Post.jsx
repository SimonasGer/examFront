import { useNavigate } from "react-router-dom"
const Post = (props) => {
    const navigate = useNavigate();
    const imageSize = {
        height: 200,
    }
    const handleExpand = () => {
        navigate(`/posting/${props._id}`)
    }
    return(
        <article className="card w-25 m-5">
            <img style={imageSize} src={props.image} alt="" className="card-img-top"></img>
            <div className="d-flex flex-column justify-content-between card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <div className="d-flex justify-content-between">
                    <div className="fs-5">{props.price}$</div>
                    <button className="btn btn-primary" onClick={handleExpand}>more info</button>
                </div>
            </div>
        </article>
    )
}
export default Post