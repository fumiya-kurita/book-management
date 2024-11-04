import { useState } from "react"
import { useForm } from 'react-hook-form'
import "./Input.css"

type Props = {
    onAdd: (title: string, author: string, price: string, detail: string) => void
    closeModal: () => void
}

type Form = {
    title: string
    author: string
    detail: string
    price: string
}
const numberRegExp = /^[0-9]+$/

const Input = ({ onAdd, closeModal }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<Form>({ mode: 'onBlur' })

    const [book, setBook] = useState({
        title: "",
        author: "",
        price: "",
        detail: ""
    })

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setBook({ ...book, title: e.target.value })
    const handleChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => setBook({ ...book, author: e.target.value })
    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => setBook({ ...book, price: e.target.value })
    const handleChangeDetail = (e: React.ChangeEvent<HTMLInputElement>) => setBook({ ...book, detail: e.target.value })

    //アイテム追加
    const handleAdd = () => {
        if (book.title && book.author && book.price && book.detail) {
            onAdd(book.title, book.author, book.price, book.detail)
            closeModal()
        }
    }

    //入力中の値をリセット
    const handleClear = () => {
        setBook({
            title: "",
            author: "",
            price: "",
            detail: ""
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleAdd)}>

                <div className="title-form">
                    <span>タイトル：</span>
                    <input
                        {...register('title', {
                            required: '必須入力です',
                            maxLength: {
                                value: 50,
                                message: '最大50文字です'
                            }
                        })}
                        type="text"
                        placeholder="input title"
                        value={book.title}
                        onChange={handleChangeTitle}
                    />
                    <div>
                        {errors.title && <span className="title-error">{errors.title.message}</span>}
                    </div>
                </div>

                <div className="author-form">
                    <span>著者：</span>
                    <input
                        {...register('author', {
                            required: '必須入力です',
                            maxLength: {
                                value: 50,
                                message: '最大50文字です'
                            }
                        })}
                        type="text"
                        placeholder="input author"
                        value={book.author}
                        onChange={handleChangeAuthor}
                    />
                    <div>
                        {errors.author && <span className="author-error">{errors.author.message}</span>}
                    </div>
                </div>

                <div className="price-form">
                    <span>値段：</span>
                    <input
                        {...register('price', {
                            required: '必須入力です',
                            pattern: {
                                value: numberRegExp,
                                message: '整数で入力してください',
                            },
                            min: {
                                value: 0,
                                message: '0以上の数字を入力してください',
                            }
                        })}
                        type="text"
                        placeholder="input price"
                        value={book.price}
                        onChange={handleChangePrice}
                    />
                    <div>
                        {errors.price && <span className="price-error">{errors.price.message}</span>}
                    </div>
                </div>

                <div className="detail-form">
                    <span>本の詳細：</span>
                    <input
                        {...register('detail', {
                            required: '必須入力です',
                            maxLength: {
                                value: 100,
                                message: '最大100文字です'
                            }
                        })}
                        type="text"
                        placeholder="input detail"
                        onChange={handleChangeDetail}
                    />
                    <div>
                        {errors.detail && <span className="detail-error">{errors.detail.message}</span>}
                    </div>
                </div>

                <button className="input-button" type="submit">追加</button>
                <button className="clear-button" onClick={handleClear}>リセット</button>
            </form>

        </>
    )
}

export default Input