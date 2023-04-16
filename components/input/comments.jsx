import { useEffect, useState } from "react";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import styles from "./comments.module.css";
import { toast } from "react-toastify";

const Comments = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState({
    addNewComment: false,
    getComments: true,
  });

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then(({ comments }) => setComments(comments))
        .catch((err) => toast.error("Error in load comments."))
        .finally(() =>
          setIsLoading((prevState) => ({ ...prevState, getComments: false }))
        );
    }
  }, [showComments, eventId]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = (commentData) => {
    setIsLoading((prevState) => ({ ...prevState, addNewComment: true }));

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ message, comment }) => {
        setComments((prevComments) => [comment, ...prevComments]);
        toast.success(message);
      })
      .catch((err) => {
        toast.error("Something was wrong.");
      })
      .finally(() => {
        setIsLoading((prevState) => ({ ...prevState, addNewComment: false }));
      });
  };

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && (
        <NewComment
          onAddComment={addCommentHandler}
          isLoading={isLoading.addNewComment}
        />
      )}
      {showComments && (
        <CommentList items={comments} isLoading={isLoading.getComments} />
      )}
    </section>
  );
};

export default Comments;
