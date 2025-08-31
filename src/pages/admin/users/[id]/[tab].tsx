// Import necessary modules and components
import { useRouter } from "next/router";
import userHook from "src/hooks/admin/user-hook";
import UserViewPage from "src/views/admin/user/view/UserViewPage";

// Define the functional component
const UserView = () => {
  const router = useRouter();
  const userId = router.query.id;
  const tab = router.query.tab || "account";
  const { useGetOneUser } = userHook();
  const { data: user, isLoading } = useGetOneUser(String(userId));

  return <UserViewPage isLoading={isLoading} tab={String(tab)} user={user} />;
};
UserView.acl = {
  action: "read",
  subject: "user",
};
export default UserView;
