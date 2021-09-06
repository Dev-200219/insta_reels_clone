import { useContext, useState } from "react";
import "./VideoCard.css";
import { firestore } from "./firebase";
import { userContext } from "./AuthProvider";

let VideoCard = (props) => {
  let [playing, setPlaying] = useState(true);
  let [commentBoxOpen, setCommentBoxOpen] = useState(false);
  let [userComment, setUserComment] = useState("");

  let user = useContext(userContext);

  let currUserLiked;
  let commentsArr;
  if (user) {
    commentsArr = props.data.comments;
    currUserLiked = props.data.likes.includes(user.uid);
  }

  return (
    <div className="video-card">
      <p className="video-card-username">{props.data.name}</p>
      <span className="video-card-music">
        <span className="material-icons">music_note</span>
        <marquee>Song Name</marquee>
      </span>

        <span
          className="material-icons-outlined video-card-comment"
          onClick={(e) => {
            if (commentBoxOpen) setCommentBoxOpen(false);
            else setCommentBoxOpen(true);
          }}
        >
          chat
        </span>

      {commentBoxOpen ? (
        <div className="video-comment-box">
          <div className="actual-comments">
            {commentsArr.map((singleComment) => {
              return (
                <div className="single-comment">
                  <div className="user-comment-img">
                    <img src={singleComment.photoURL} />
                  </div>

                  <div>
                    <h5>{singleComment.name}</h5>
                    <p>{singleComment.comment}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="add-comment">
            <input
              onChange={(e) => {
                setUserComment(e.currentTarget.value);
              }}
              type="text"
              value={userComment}
            />
            <button
              onClick={() => {
                let userCommentObj = {
                  name: user.displayName,
                  photoURL: user.photoURL,
                  comment: userComment,
                };

                commentsArr.push(userCommentObj);
                firestore
                  .collection("posts")
                  .doc(props.data.id)
                  .update({ comments: commentsArr });

                setUserComment("");
              }}
            >
              Post
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <span
        onClick={() => {
          let likesArr = props.data.likes;
          if (currUserLiked) {
            likesArr = likesArr.filter((id) => {
              return id !== user.uid;
            });
          } else {
            likesArr.push(user.uid);
          }

          firestore
            .collection("posts")
            .doc(props.data.id)
            .update({ likes: likesArr });
        }}
        className="material-icons-outlined video-card-like"
      >
        {currUserLiked ? "favorite" : "favorite_border"}
      </span>

      <video
        autoPlay
        loop
        src={props.data.url}
        onClick={(e) => {
          if (playing) {
            e.currentTarget.pause();
            setPlaying(false);
          } else {
            e.currentTarget.play();
            setPlaying(true);
          }
        }}
      ></video>
    </div>
  );
};

export default VideoCard;
