import React, { useRef, useState } from "react";
import "./index.css";
import Fuse from "fuse.js";
import books from "./books.json";
import Card from "./Card";
import Modal from "./Modal";
function App() {
  const [data, setData] = useState(books);
  const [showModal, setShowModal] = useState(false);
  const currentBook = useRef("");
  const openModal = (book) => {
    setShowModal(true);
    currentBook.current = book;
  };
  const closeModal = (event) => {
    setShowModal(false);
  };
  const searchData = (pattern) => {
    if (!pattern) {
      setData(books);
      return;
    }

    const fuse = new Fuse(data, {
      keys: ["title", "author"]
    });

    const result = fuse.search(pattern);
    const matches = [];
    if (!result.length) {
      setData([]);
    } else {
      result.forEach(({ item }) => {
        matches.push(item);
      });
      setData(matches);
    }
  };

  return (
    <div>
      <h1 className="Title">My Favorite books</h1>
      <input
        placeholder="Search"
        onChange={(e) => searchData(e.target.value)}
        style={{ margin: "auto", display: "block" }}
      />

      <div className="Container">
        {data.map((item) => (
          <Card {...item} key={item.title} onClick={() => openModal(item)} />
        ))}
      </div>
      {showModal && <Modal {...currentBook.current} closeModal={closeModal} />}
    </div>
  );
}

export default App;
