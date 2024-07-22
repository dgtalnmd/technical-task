import {useMemo, useState} from "react";
import {toast} from "react-toastify";
import {Comment, CommentsRes, Pagination} from "../types";
import getCommentsRequest from "src/api/comments/getCommentsRequest";
import {calcCount, prepareCommentsWithChildren} from "../utils";

import CommentsStyles from "../Comments.module.css";

export const useComments = () => {
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [comments, setComments] = useState<Comment[] | null>(null);
    const [isLoadingComments, setIsLoadingComments] = useState(false);

    const loadComments = (
        page: number = pagination?.page ? pagination?.page + 1 : 1,
    ) => {
        setIsLoadingComments(true);
        getCommentsRequest(page)
            .then((data: CommentsRes) => {
                const comments = data.data.sort((a, b) =>
                    b.created.localeCompare(a.created),
                );

                const commentsWithChildren =
                    prepareCommentsWithChildren(comments);

                setComments((prev) =>
                    prev
                        ? [...prev, ...commentsWithChildren]
                        : commentsWithChildren,
                );
                setPagination({
                    ...data.pagination,
                    totalPages: data.pagination.total_pages,
                });
            })
            .catch((err) => {
                console.error(err);
                toast("Ошибка загрузки комментариев", {
                    type: "error",
                    bodyClassName: CommentsStyles.Toast,
                });
            })
            .finally(() => {
                setIsLoadingComments(false);
            });
    };

    const {commentsCount, likesCount} = useMemo(() => {
        return comments
            ? calcCount(comments)
            : {commentsCount: 0, likesCount: 0};
    }, [comments]);

    return {
        comments,
        pagination,
        isLoadingComments,
        loadComments,
        setComments,
        commentsCount,
        likesCount,
    };
};
