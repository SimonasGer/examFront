import Comment from "./Comment"

const Comments = (props) => {
    const comments = props.comments
    return(
        <div className="w-100 my-5">
            <h2 className="text-center">Comments</h2>
            <div className="w-100">
                {comments.map(comment => (
                    <Comment _id={comment} loading={props.loading}/>
                ))}
            </div>
        </div>
    )
}

export default Comments