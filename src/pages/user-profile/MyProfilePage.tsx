import styles from "./MyProfilePage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "api/users";
import Container from "components/Container";
import Button from "components/ui/Button/Button";
import Skeleton from "react-loading-skeleton";

const MyProfilePage = () => {
  const {
    data: userInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getMyProfile,
  });

  const name = `${userInfo?.lastName}${userInfo?.firstName}`;

  if (error) return <div>{error.message}</div>;

  return (
    <Container>
      <h1>My Profile</h1>

      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <div className={styles.image}>img</div>
          <div className={styles.info}>
            <div className={styles.row1}>
              {userInfo?.nickname} <Button>Edit Profile</Button>
            </div>
            <div className={styles.row2}>게시물 0</div>
            <div className={styles.row3}>{name}</div>
          </div>
        </>
      )}
    </Container>
  );
};

export default MyProfilePage;
