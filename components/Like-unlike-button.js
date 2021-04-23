import React from "react";
import styles from '../styles/LikeUnlikeButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const HEART_ICON = "/heart-icon.png";

const LikeUnlikeButton = ({ isLiked, onClick }) => {
    return (
        <div>
            { !isLiked &&
                <button className={styles.likeButton} onClick={onClick}>
                    <FontAwesomeIcon
                        icon={faThumbsUp}
                        size="lg"
                        alt={"info icon"}/>
                </button>
            }
            { isLiked &&
                <button className={styles.unlikeButton} onClick={onClick} >
                    <img className={styles.redHeart}
                        width="20"
                        alt={"heart icon"}
                        src={HEART_ICON}>
                    </img>
                </button>
            }
        </div>
    )
}

export default LikeUnlikeButton;