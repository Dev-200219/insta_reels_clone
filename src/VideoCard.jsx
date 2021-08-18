import { useState } from "react";
import "./VideoCard.css"

let VideoCard = () => {

    let [playing, setPlaying] = useState(true)
    let [commentBoxOpen, setCommentBoxOpen] = useState(false)

    return <div className="video-card">

        <p className="video-card-username">Dev Arora</p>
        <span className="video-card-music">
            <span class="material-icons">
                music_note
            </span>
            <marquee>Song Name</marquee>
        </span>

        <span class="material-icons-outlined video-card-comment"
            onClick={
                (e) => {
                    if (commentBoxOpen)
                        setCommentBoxOpen(false)
                    else
                        setCommentBoxOpen(true)
                }
            }
        >chat</span>

        {commentBoxOpen ? <div className="video-comment-box">
            <div className="actual-comments">
                
                <div className="single-comment">
                    <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWJzdHJhY3QlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" />

                    <div>
                        <h5>Dev Arora</h5>
                        <p>This is a random comment</p>
                    </div>
                </div>
                
                <div className="single-comment">
                    <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWJzdHJhY3QlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" />

                    <div>
                        <h5>Dev Arora</h5>
                        <p>This is a random comment</p>
                    </div>
                </div>
                <div className="single-comment">
                    <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWJzdHJhY3QlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" />

                    <div>
                        <h5>Dev Arora</h5>
                        <p>This is a random comment</p>
                    </div>
                </div>

            </div>

            <div className="add-comment">
                <input type="text" />
                <button>Post</button>
            </div>
            
        </div> : ""}

        <span class="material-icons-outlined video-card-like">
            favorite_border
        </span>

        <video autoPlay loop src="https://assets.mixkit.co/videos/preview/mixkit-red-frog-on-a-log-1487-large.mp4"
            onClick={(e) => {
                if (playing) {
                    e.currentTarget.pause();
                    setPlaying(false);
                }
                else {
                    e.currentTarget.play();
                    setPlaying(true);
                }
            }}
        ></video>
    </div>
}

export default VideoCard;