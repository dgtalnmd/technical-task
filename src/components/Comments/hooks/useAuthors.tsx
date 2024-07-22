import {useState} from "react";
import getAuthorsRequest from "src/api/authors/getAuthorsRequest";
import {Author} from "../types";
import {toast} from "react-toastify";

import CommentsStyles from "../Comments.module.css";

export const useAuthors = () => {
    const [isLoadingAuthors, setIsLoadingAuthors] = useState(false);
    const [authors, setAuthors] = useState<Record<number, Author> | null>(null);

    const loadAuthors = () => {
        setIsLoadingAuthors(true);
        getAuthorsRequest()
            .then((data: Author[]) => {
                setAuthors(
                    data.reduce((acc, author) => {
                        acc[author.id] = author;
                        return acc;
                    }, {} as Record<number, Author>),
                );
            })
            .catch((err) => {
                console.error(err);
                toast("Ошибка загрузки авторов", {
                    type: "error",
                    bodyClassName: CommentsStyles.Toast,
                });
            })
            .finally(() => {
                setIsLoadingAuthors(false);
            });
    };

    return {loadAuthors, isLoadingAuthors, authors};
};
