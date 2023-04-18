import { useEffect, useState } from "react";
import useNotificationContext from "@/store/notification-context";

import CommentList from "./comment-list";
import NewComment from "./new-comment";

import styles from "./comments.module.css";

const Comments = ({ eventId }) => {
  const notificationCtx = useNotificationContext();

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState({
    addNewComment: false,
    fetchComments: true,
  });

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((data) => {
            throw new Error(data.message || "Something went wrong!");
          });
        })
        .then(({ comments }) => setComments(comments))
        .catch((err) =>
          notificationCtx.showNotification({
            status: "error",
            title: "Error show comments",
            message: err.message || "Show comments went wrong!",
          })
        )
        .finally(() =>
          setIsLoading((prevState) => ({ ...prevState, fetchComments: false }))
        );
    }
  }, [showComments]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = (commentData) => {
    setIsLoading((prevState) => ({ ...prevState, addNewComment: true }));

    notificationCtx.showNotification({
      status: "pending",
      title: "Send comment...",
      message: "Sending your comment to the server",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then(({ message, comment }) => {
        setComments((prevComments) => [comment, ...prevComments]);
        notificationCtx.showNotification({
          title: "Success",
          message: message || "Successfully registered your comment.",
          status: "success",
        });
      })
      .catch((err) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: err.message || "Something went wrong!",
          status: "error",
        });
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
      {showComments && !isLoading.fetchComments && (
        <CommentList items={comments} />
      )}
      {showComments && isLoading.fetchComments && <p>Loading...</p>}
    </section>
  );
};

export default Comments;
