import { useEffect, useState } from "react";
import axios from "axios";
import './Books.css';

const Books = () => {
    const [booksList, setBooksList] = useState([]);

    useEffect(() => {
     axios
      .get("https://reactnd-books-api.udacity.com/books", {headers: { Authorization: "whatever-you-want" }})
      .then((response) => {
        setBooksList(response.data.books);
      })
      .catch((error) => {
        if(error.response !== undefined && 404 === error.response.status){
            console.log(`Status Code: ${error.response.status}`);
            console.log("Website not found");
        }else{
            console.log(error.message);
        }
      });
  }, []);

  return (
    <>
      {booksList.map((bookDetail) => {
        const{id, title, description, authors, imageLinks} = bookDetail;
        return(
            <div className="book" key={id}>
                <h2>{title}</h2>
                <div className="book-details">
                    <img src={imageLinks.thumbnail} alt="book image thumbnail" width={170} />
                    <p>{description}</p>
                </div>
                <p>Authors : {authors.join(", ")}</p>
            </div>
        );
    })}
    </>
  );
}

export default Books;
