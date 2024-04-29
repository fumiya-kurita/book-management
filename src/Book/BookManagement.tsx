import { useState } from "react"
import Books from "./Books.json"
import BookList from "./BookList"
import Input from "./Input"
import Book from "./Book"
import Search from "./Search"
import "./BookManagement.css"
import { useModal } from 'react-hooks-use-modal'

const BookManagement = () => {
    const [books, setBooks] = useState<Book[]>(Books.book)
    //選択中のアイテム数
    const [selectedBooks, setSelectedBooks] = useState(0)
    //削除ボタンの活性・非活性
    const [disable, setDisable] = useState(true)

    //キーの設定
    let keyNumber = books.length + 1
    const setKey = () => {
        if (keyNumber < 10) {
            return "00" + keyNumber
        } else if (keyNumber < 100)
            return "0" + keyNumber
        else {
            return String(keyNumber)
        }
    }

    //アイテム追加
    const handleAdd = (title: string, author: string, price: string, detail: string) => {
        setBooks([...books, { key: setKey(), title, author, price, detail, check: false }])
        console.log(books)
    }

    //アイテムチェック
    const handleCheck = (book: Book) => {
        const newBooks = books.map(books => {
            if (books.key === book.key) {
                books.check = !books.check
            }
            return books
        })
        setBooks(newBooks)

        const select = books.filter(books => books.check).length
        setSelectedBooks(select)
        if (select === 0) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }

    //アイテム削除
    const handleDelete = () => {
        const undeletedItems = books.filter(book => !book.check)
        setBooks(undeletedItems)
        setDisable(true)
        setSelectedBooks(0)
    }

    //モーダルの表示
    const [Modal, open, close, isOpen] = useModal("modal", {
        preventScroll: true,
        focusTrapOptions: {
            clickOutsideDeactivates: false
        },
    });
    //モーダルを閉じる
    const closeModal = () => {
        close();
    }

    return (
        <>
            <div className="BookList">
                <header>
                    <div>
                        <h3>書籍管理</h3>
                        <Search setBooks={setBooks} setSelectedBooks={setSelectedBooks} />
                        <button className="modal-button" onClick={open}>追加</button>
                        <button className={disable ? "delete-button-true" : "delete-button-false"} disabled={disable} onClick={handleDelete}>削除</button>
                    </div>
                </header>

                <table align="center" >
                    <tbody>
                        <tr>
                            <th><span>{selectedBooks}個選択中</span></th>
                            <th>タイトル</th>
                            <th>著者</th>
                            <th>値段</th>
                            <th>詳細</th>
                        </tr>

                        {books.map(book => (
                            <BookList books={book} onCheck={handleCheck} key={book.key} />
                        ))}
                    </tbody>
                </table>

                <div id="modal">
                    <Modal>
                        <div className="showModal">
                            <span>ー 書籍の追加 ー</span>
                            <Input onAdd={handleAdd} closeModal={closeModal} />
                            <span className="batsu" onClick={close}></span>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default BookManagement