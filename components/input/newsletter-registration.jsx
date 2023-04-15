import { useRef } from "react";
import { toast } from "react-toastify";
import styles from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();

  const registrationHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    const toastId = toast.loading("Register your email...");

    fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: enteredEmail,
      }),
    })
      .then((res) => res.json())
      .then(({ message, status }) => {
        emailInputRef.current.value = "";

        toast.update(toastId, {
          render: message,
          type:
            status === 422 ? "warning" : status === 500 ? "error" : "success",
          autoClose: 4000,
          isLoading: false,
        });
      })
      .catch((err) => {
        toast.error("Something went wrong please try again");
      });
  };

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
