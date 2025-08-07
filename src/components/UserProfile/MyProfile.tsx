import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "api/users";
import Skeleton from "react-loading-skeleton";
import styles from "./Profile.module.scss";

const MyProfile = () => {
  const {
    data: userInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getMyProfile,
  });

  if (error) return <div>{error.message}</div>;

  return (
    <div className={styles.container}>
      <h1>My Profile</h1>

      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <div className={styles.image}>img</div>
          <div className={styles.info}>
            <div className={styles.row1}>{userInfo?.nickname}, 편집</div>
            <div className={styles.row2}>게시물 0</div>
            <div className={styles.row3}>이름</div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyProfile;
