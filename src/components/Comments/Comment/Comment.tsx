import {toggleLikeCommentInMap} from "./utils";

import CommentStyle from "./Comment.module.css";
import {Comment as CommentType} from "../types";
import {CommentsList} from "../CommentsList/CommentsList";
import {ReactComponent as LikeOutlineRedSvg} from "../../../assets/like-outline-red.svg";
import {ReactComponent as LikeSvg} from "../../../assets/like.svg";
import {useContext} from "react";
import {CommentsContext} from "../Comments";
import {formatDate} from "src/lib/date";

export const Comment = ({comment}: {comment: CommentType}) => {
    const {authors, setComments} = useContext(CommentsContext);

    const author = authors?.[comment.author];

    if (!author) {
        return null;
    }

    const toggleLike = () => {
        setComments?.((prev) => {
            return prev
                ? prev.map((c) => {
                      return toggleLikeCommentInMap(c, comment.id);
                  })
                : prev;
        });
    };

    return (
        <>
            <div className={CommentStyle.Comment}>
                <img
                    className={CommentStyle.Avatar}
                    src={author.avatar}
                    alt={author.name}
                />
                <div className={CommentStyle.CommentContent}>
                    <div className={CommentStyle.CommentHeader}>
                        <div className={CommentStyle.CommentHeaderLeft}>
                            <div className={CommentStyle.Author}>
                                {author.name}
                            </div>
                            <div className={CommentStyle.Date}>
                                {formatDate(comment.created)}
                            </div>
                        </div>
                        <div className={CommentStyle.LikeCounter}>
                            <div
                                className={CommentStyle.LikeIcon}
                                onClick={toggleLike}
                            >
                                {comment.likedByMe ? (
                                    <LikeSvg />
                                ) : (
                                    <LikeOutlineRedSvg />
                                )}
                            </div>{" "}
                            {comment.likes.toLocaleString()}
                        </div>
                    </div>
                    <div className={CommentStyle.Text}>{comment.text}</div>
                </div>
            </div>
            {!!comment.children?.length && (
                <CommentsList
                    className={CommentStyle.CommentsList}
                    comments={comment.children}
                />
            )}
        </>
    );
};
