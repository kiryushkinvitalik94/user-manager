import styles from "./UserDetails.module.css";
import { User } from "../../interfaces/User";

export default function UserDetails(props: { user: User }) {
  const { user } = props;

  return (
    <div>
      <div className={styles.infoItem}>
        <span className={styles.infoLabel}>My name is: </span>
        <span className={styles.infoText}>
          {user?.name?.title} {user?.name?.first} {user?.name?.last}{" "}
        </span>
      </div>
      <div className={styles.infoItem}>
        <span className={styles.infoLabel}>Birthday: </span>
        <span className={styles.infoText}>
          {new Date(user.dob.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
      <div className={styles.infoItem}>
        <span className={styles.infoLabel}>mobile: </span>
        <span className={styles.infoText}>{user.phone}</span>
      </div>
      <div className={styles.infoItem}>
        <span className={styles.infoLabel}>email: </span>
        <span className={styles.infoText}>{user.email}</span>
      </div>
    </div>
  );
}
