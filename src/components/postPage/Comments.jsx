import Comment from "./Comment"
import "./comments.scss"
const Comments = (props) => {
    const comments = props.comments
    return(
        <div className="comments">
            <h2>Comments</h2>
            <div>
                {comments.map(comment => (
                    <Comment _id={comment} loading={props.loading}/>
                ))}
            </div>
        </div>
    )
}

export default Comments