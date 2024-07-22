import {Comment, CommentRaw} from "./types";

export const prepareCommentsWithChildren = (comments: CommentRaw[]) => {
    const {withParent, withoutParent} = comments.reduce(
        (acc, comment) => {
            if (!!comment.parent) {
                acc.withParent.set(comment.id, comment);
            } else {
                acc.withoutParent.set(comment.id, {...comment, children: []});
            }
            return acc;
        },
        {
            withParent: new Map<number, CommentRaw>(),
            withoutParent: new Map<number, Comment>(),
        },
    );

    withParent.forEach(({parent, ...comment}) => {
        withoutParent.get(parent!)?.children?.push(comment);
    });

    return Array.from(withoutParent.values());
};

export const calcCount = (comments: Comment[]) => {
    return comments.reduce(
        (acc, comment) => {
            acc.commentsCount += 1;
            acc.likesCount += comment.likes;

            if (comment.children) {
                const {commentsCount, likesCount} = calcCount(comment.children);
                acc.commentsCount += commentsCount;
                acc.likesCount += likesCount;
            }

            return acc;
        },
        {
            commentsCount: 0,
            likesCount: 0,
        },
    );
};
