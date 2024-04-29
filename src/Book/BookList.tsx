import Book from "./Book"
import "./BookList.css"

type Props = {
    books: Book
    onCheck: (books: Book) => void
}

const Input = ({ books, onCheck }: Props) => {

    const check = () => {
        onCheck(books)
    }

    return (
        <>
            <tr className={books.check ? "check-books" : "click"} onChange={check} >
                <td><input type="checkbox" className="check" /></td>
                <td >{books.title}</td>
                <td >{books.author}</td>
                <td >{books.price}</td>
                <td><button className="detail-button">詳細</button></td>
            </tr >
        </>
    )
}
export default Input