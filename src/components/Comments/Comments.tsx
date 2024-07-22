import cn from "classnames";
import {createContext, useEffect, useRef} from "react";

import CommentsStyles from "./Comments.module.css";
import {Author, Comment} from "./types";

import {ReactComponent as LikeOutlineSvg} from "../../assets/like-outline.svg";
import {CommentsList} from "./CommentsList/CommentsList";
import plural from "plural-ru";
import {useAuthors} from "./hooks/useAuthors";
import {useComments} from "./hooks/useComments";

export const CommentsContext = createContext<{
    authors?: Record<number, Author>;
    setComments?: React.Dispatch<React.SetStateAction<Comment[] | null>>;
}>({});

export const Comments = () => {
    const {loadAuthors, isLoadingAuthors, authors} = useAuthors();
    const {
        loadComments,
        comments,
        isLoadingComments,
        setComments,
        pagination,
        commentsCount,
        likesCount,
    } = useComments();

    const init = useRef(false);
    useEffect(() => {
        if (!init.current) {
            loadAuthors();
            loadComments();
            init.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (
        (!authors && isLoadingAuthors) ||
        (!comments?.length && isLoadingComments)
    ) {
        return (
            <div className={CommentsStyles.SpinnerContainer}>
                <div className={CommentsStyles.Spinner} />
            </div>
        );
    }

    if (!authors) {
        return <div>Не удалось загрузить авторов</div>;
    }

    if (!comments) {
        return <div>Не удалось загрузить комментарии</div>;
    }

    return (
        <CommentsContext.Provider value={{authors, setComments}}>
            <div className={CommentsStyles.Container}>
                <header className={CommentsStyles.Header}>
                    <span>
                        {commentsCount}{" "}
                        {plural(
                            commentsCount,
                            "комментарий",
                            "комментария",
                            "комментариев",
                        )}
                    </span>
                    <span className={CommentsStyles.LikeCounter}>
                        <LikeOutlineSvg /> {likesCount.toLocaleString()}
                    </span>
                </header>

                <CommentsList
                    comments={comments}
                    className={CommentsStyles.CommentsList}
                >
                    {pagination && pagination.page < pagination.totalPages && (
                        <button
                            onClick={() => loadComments()}
                            className={CommentsStyles.Button}
                            disabled={isLoadingComments}
                        >
                            {isLoadingComments ? (
                                <div
                                    className={cn(
                                        CommentsStyles.Spinner,
                                        CommentsStyles.Small,
                                    )}
                                />
                            ) : (
                                "Загрузить еще"
                            )}
                        </button>
                    )}
                </CommentsList>
            </div>
        </CommentsContext.Provider>
    );
};
