import Notification from "../ui/notification";
import MainHeader from "./main-header";

const Layout = ({ children }) => {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {/* <Notification title="Success" message="" status="success" /> */}
    </>
  );
};

export default Layout;
