import styles from './Post.module.css'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Comment } from './Comment'
import { Avatar } from './Avatar'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

interface  Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

export interface PostType {
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}
interface PostProps {
   post: PostType;
}


export function Post({ post }: PostProps) {

    const [comment, setComment] = useState(['Post muito bacana!'])

    const [newCommentText, setNewCommentText] = useState('')

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()

        setComment([...comment, newCommentText]);
        setNewCommentText('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    function deleteComment(commentToDelete: string) {
        const commentWithOutDeleteOne = comment.filter(comments => {
            return (
                comments != commentToDelete
            )
        })
        setComment(commentWithOutDeleteOne);

    }


    const publishedDateFormatted = format(post.publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    const isNewCommentEmpty = newCommentText.length == 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.autor}>
                    <Avatar 
                    hasBorder={true}
                    src={post.author.avatarUrl}
                    alt=""
                     />
                    <div className={styles.autorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>
            <div className={styles.contents}>
                {post.content.map(line => {
                    if (line.type == 'paragraph') {
                        return (
                            <p key={line.content}>{line.content}</p>
                        )
                    } else
                        return (
                            <p key={line.content}>👉{'  '}<a href='#'>{line.content}</a></p>
                        )
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu Feedback </strong>
                <textarea
                    required
                    onInvalid={handleNewCommentInvalid}
                    name='comment'
                    placeholder='Deixe uma mensagem'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                />

                <footer>
                    <button
                        type='submit'
                        disabled={isNewCommentEmpty}
                    >
                        Comentar
                    </button>
                </footer>

            </form>
            <div className={styles.commentList}>
                {comment.map(comments => {
                    return (
                        <Comment
                            key={comments}
                            content={comments}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}

            </div>
        </article>
    )
}