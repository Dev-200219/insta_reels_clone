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

      {/* {commentBoxOpen ? (
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Comments
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="actual-comments">
                  {commentsArr.map((singleComment, idx) => {
                    return (
                      <div key={idx} className="single-comment">
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
              </div>
              <div className="modal-footer">
                <input
                  onChange={(e) => {
                      console.log(1);
                    setUserComment(e.currentTarget.value);
                  }}
                  type="text"
                  value={userComment}
                />

                <button
                  onClick={() => {
                      console.log("hello");
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
          </div>
        </div>
      ) : (
        ""
      )} */}

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
