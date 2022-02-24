import React from "react";
import { Link } from "react-router-dom";

let getDate = (note)=>{
  return new Date(note.updated).toLocaleDateString();
}

let getTitle = (note)=>{
  const title = note.body.split("\n")[0];
  if(title.lenght>45){
    return title.slice(0, 45);
  }
  return title;
}

let getContent = (note)=>{
  const title = getTitle(note);
  let content = note.body.replaceAll('\n', ' ');
  content = content.replaceAll(title, '');

  if(content.lenght>45){
    return content.slice(0, 45);
  }
  return content;
}

const ListItem = ({ note }) => {
  return (
    <Link to={`/notes/${note.id}`}>
        <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p><span>{getDate(  note)}</span>{getContent(note)}</p>
        </div>
    </Link>
  );
};

export default ListItem;
