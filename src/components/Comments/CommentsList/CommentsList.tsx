import {PropsWithChildren} from "react";

import {Comment as CommentType} from "src/components/Comments/types";
import {Comment} from "../Comment/Comment";
import CommentsListStyles from "./CommentsList.module.css";

export const CommentsList = ({
    comments,
    children,
    className,
}: PropsWithChildren<{
    comments: CommentType[];
    className?: string;
}>) => {
    return (
        <div className={`${CommentsListStyles.CommentsList} ${className}`}>
            {comments.map((comment) => {
                return <Comment key={comment.id} comment={comment} />;
            })}

            {children}
        </div>
    );
};
