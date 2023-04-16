import styles from "./comment-list.module.css";

const CommentList = ({ items, isLoading }) => {
  if (isLoading) return <p>Loading...</p>;

  return (
    <ul className={styles.comments}>
      {items.map((item) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
