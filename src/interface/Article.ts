export interface Article {
    id?: string;
    title: string;
    nickname: string;
    content: string;
    createdAt: Date;   
}

export interface Comments {
    id?: string;
    articleId: string;
    parentId: string;
    comment: string;
    nickname: string;
    createdAt: Date;   
}