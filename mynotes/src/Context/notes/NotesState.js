import React, {useEffect}from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const notesInitial =  [
        {
          "_id": "658810ac7a844b4928c79132",
          "user": "657ed6def196957fe8c4d70f",
          "title": "My Notes App",
          "description": "Complete the my notes app",
          "tag": "Important",
          "date": "2023-12-24T11:06:20.497Z",
          "__v": 0
        },
        {
          "_id": "658810ad7a844b4928c79134",
          "user": "657ed6def196957fe8c4d70f",
          "title": "My Notes App",
          "description": "Complete the my notes app",
          "tag": "Important",
          "date": "2023-12-24T11:06:21.021Z",
          "__v": 0
        },
        {
          "_id": "658810ad7a844b4928c79136",
          "user": "657ed6def196957fe8c4d70f",
          "title": "My Notes App",
          "description": "Complete the my notes app",
          "tag": "Important",
          "date": "2023-12-24T11:06:21.743Z",
          "__v": 0
        },
        {
          "_id": "658810ae7a844b4928c79138",
          "user": "657ed6def196957fe8c4d70f",
          "title": "My Notes App",
          "description": "Complete the my notes app",
          "tag": "Important",
          "date": "2023-12-24T11:06:22.300Z",
          "__v": 0
        },
        {
          "_id": "658a1d0c79f2796e024e25be",
          "user": "657ed6def196957fe8c4d70f",
          "title": "My Notes App",
          "description": "Complete the my notes app",
          "tag": "Important",
          "date": "2023-12-26T00:23:40.938Z",
          "__v": 0
        },
        {
          "_id": "658a1d3079f2796e024e25c0",
          "user": "657ed6def196957fe8c4d70f",
          "title": "Check update",
          "description": "Complete it fast",
          "tag": "Important",
          "date": "2023-12-26T00:24:16.662Z",
          "__v": 0
        },
        {
          "_id": "658a1d3d79f2796e024e25c2",
          "user": "657ed6def196957fe8c4d70f",
          "title": "bike update",
          "description": "Complete it fast",
          "tag": "Important",
          "date": "2023-12-26T00:24:29.206Z",
          "__v": 0
        },
        {
          "_id": "658a1d4979f2796e024e25c4",
          "user": "657ed6def196957fe8c4d70f",
          "title": "any update",
          "description": "yes many",
          "tag": "Important",
          "date": "2023-12-26T00:24:41.339Z",
          "__v": 0
        }
      ]

      // const [notes, setNotes] = useEffect(notesInitial)
      const [notes, setNotes] = React.useState(notesInitial);


    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;