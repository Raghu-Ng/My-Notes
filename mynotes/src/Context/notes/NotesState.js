import React from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const state = {
        "name" : "Raghav",
        "class" : "5th C"
    }
    return(
        <NoteContext.Provider value={state}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;