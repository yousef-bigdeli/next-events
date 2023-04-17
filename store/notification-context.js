import { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export function NotificationContextProvider({ children }) {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => setActiveNotification(null), 3000);

      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

  const handleShowNotification = (notificationData) => {
    setActiveNotification(notificationData);
  };

  const handleHideNotification = () => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: handleShowNotification,
    hideNotification: handleHideNotification,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

const useNotificationContext = () => useContext(NotificationContext);
export default useNotificationContext;
