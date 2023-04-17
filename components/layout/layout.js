import useNotificationContext from "@/store/notification-context";
import MainHeader from "./main-header";
import Notification from "../ui/notification";

const Layout = ({ children }) => {
  const notificationCtx = useNotificationContext();
  const activeNotification = notificationCtx.notification;

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && <Notification {...notificationCtx.notification} />}
    </>
  );
};

export default Layout;
