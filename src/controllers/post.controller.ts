import e, { Request, Response } from 'express';

import { connect } from '../database'
import { Article, Comments } from '../interface/Article';

export async function getPosts(req: Request, res: Response): Promise<Response> {
    const page: any = (req.query.page) ? req.query.page : 1;
    const perPageRecords: number = 20;
    const skip: number = (parseInt(page) - 1) * perPageRecords;
    const conn = await connect();
    const courses = await conn.query('SELECT * FROM articles LIMIT ?,?', [skip, perPageRecords]);
    await conn.end();
    return res.json(courses[0]);
}

export async function createPost(req: Request, res: Response) {
    const newPost: Article = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO articles SET ?', [newPost]);
    await conn.end();
    return res.json({
        message: 'Article Created'
    });
}


export async function getPost(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const conn = await connect();
    const courses = await conn.query('SELECT * FROM articles WHERE id = ? ', [id]);
    await conn.end();
    return res.json(courses[0]);
}

export async function getComments(req: Request, res: Response): Promise<Response> {
    let cmt: any = [];
    let ccmt: any = [];
    const id = req.params.id;
    const conn = await connect();
    const parentComments: any = await conn.query('SELECT * FROM comments WHERE articleId = ? AND parentId IS ? ', [id, null]);
    const childComments: any = await conn.query('SELECT * FROM comments WHERE articleId = ? AND parentId IS NOT ? ', [id, null]);
    await conn.end();
    const pC: any = Object.values(JSON.parse(JSON.stringify(parentComments[0])));
    const cC: any = Object.values(JSON.parse(JSON.stringify(childComments[0])));

    for (let index = 0; index < pC.length; index++) {
        const element: any = pC[index];
        cmt.push(element);
        for (let i = 0; i < cC.length; i++) {
            const element1: any = cC[i];
            if (element.id == element1.parentId) {
                ccmt.push(element1);
            }
        }
        cmt[0].subComment = ccmt
    }

    return res.json(cmt);
}

export async function createComment(req: Request, res: Response) {
    const newComment: Comments = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO comments SET ?', [newComment]);
    await conn.end();
    return res.json({
        message: 'Commented'
    });
}
