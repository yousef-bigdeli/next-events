import { useRef } from "react";
import useNotificationContext from "@/store/notification-context";
import styles from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const notificationCtx = useNotificationContext();
  const emailInputRef = useRef();

  // Handle registration
  const registrationHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      status: "pending",
      title: "Signing up",
      message: "Registering for newsletter.",
    });

    fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: enteredEmail,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then(({ message, status }) => {
        emailInputRef.current.value = "";

        notificationCtx.showNotification({
          title: "Success",
          message: "Successfully registered for newsletter!",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
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
