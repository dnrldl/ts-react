import Container from "components/Container";
import MyProfile from "components/UserProfile/MyProfile";
import OtherProfile from "components/UserProfile/OtherProfile";
import { useParams } from "react-router-dom";
import { useAuthStore } from "store/useAuthStore";

const UserProfilePage = () => {
  const { id } = useParams();
  console.log(id);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return (
    <Container>
      <MyProfile />
    </Container>
  );
};

export default UserProfilePage;
