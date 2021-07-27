import { User } from "../../interfaces/User";

import styles from "./UserListItem.module.css";

export default function UserListItem(props: { user: User }) {
  const { user } = props;
  return (
    <div className={styles.container}>
      <div className={styles.userIcon}>
        <img alt="user icon" src={user.picture.medium} />
      </div>
      <div className={styles.userInfoContainer}>
        <div className={styles.infoItem}>
          <label className={styles.labeltext}>name</label>
          <span>
            {user?.name?.title} {user?.name.first}
          </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.labeltext}>email</span>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}
