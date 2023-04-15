import { useRef } from "react";

import styles from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();

  const registrationHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    // TODO: Add new Email - POST
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
      .then(({ message }) => {
        // TODO: Show the message to the user
        console.log(message);
      }).catch(err => {
        // TODO: handle error
        console.log(err)
      })
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
