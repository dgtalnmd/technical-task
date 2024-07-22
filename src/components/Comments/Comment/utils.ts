import {Comment} from "../types";

export const toggleLikeCommentInMap = (
    comment: Comment,
    id: number,
): Comment => {
    if (comment.id === id) {
        return {
            ...comment,
            likes: comment.likes + (comment.likedByMe ? -1 : 1),
            likedByMe: !comment.likedByMe,
        };
    }

    if (comment.children) {
        return {
            ...comment,
            children: comment.children.map((child) =>
                toggleLikeCommentInMap(child, id),
            ),
        };
    }

    return comment;
};
