import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, Link, useNavigate, withRouter } from "react-router-dom";
// import notes from "../assets/data";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const noteId = params.id;

  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [noteId]);

  let getNote = async () => {
    if(noteId==="new") return;
    let response = await fetch(`http://localhost:8000/notes/${noteId}`);
    let data = await response.json();
    setNote(data);
  };

  let updateNote = async () => {
    await fetch(`http://localhost:8000/notes/${noteId}`, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  let deleteNote = async () => {
    await fetch(`http://localhost:8000/notes/${noteId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    navigate("/");
  };

  let createNote = async () => {
    await fetch(`http://localhost:8000/notes`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  let handleSubmit = () => {
    if(noteId!=='new' && !note.body){
      deleteNote();
    }else if(noteId!=='new' && note.body){
      updateNote();
    }else if(noteId==="new" && note!==null){
      createNote();
    }
    navigate("/");
  };

  // const note = notes.find((note) => note.id === Number(noteId));
  return (
    <div className="note">
      <div className="note-header">
        <h3>
            <ArrowLeft onClick={handleSubmit} />
        </h3>
        {noteId !== "new"? 
        <button onClick={deleteNote}>Delete</button> 
        : <button onClick={handleSubmit}>Done</button> }        
        
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}></textarea>
    </div>
  );
};

export default NotePage;
