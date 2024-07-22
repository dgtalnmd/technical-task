export type CommentRaw = {
    author: number;
    created: string;
    id: number;
    likes: number;
    parent: null | number;
    text: string;
};

export type Comment = {
    author: number;
    created: string;
    id: number;
    likes: number;
    text: string;
    children?: Comment[];
    likedByMe?: boolean;
};

export type PaginationRaw = {
    page: number;
    size: number;
    total_pages: number;
};

export type Pagination = {
    page: number;
    size: number;
    totalPages: number;
};

export type CommentsRes = {
    data: CommentRaw[];
    pagination: PaginationRaw;
};

export type Author = {
    avatar: string;
    id: number;
    name: string;
};
