import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const notesInital = [
        {
          "_id": "645f94a0684b63eac33a3a81",
          "user": "645f9460684b63eac33a3a7d",
          "title": "Exams",
          "description": "Exams are to be held in June",
          "tag": "goals",
          "date": "2023-05-13T13:46:08.872Z",
          "__v": 0
        },
        {
          "_id": "645f94be684b63eac33a3a83",
          "user": "645f9460684b63eac33a3a7d",
          "title": "Target internship",
          "description": "Exams for internships are to be held in August",
          "tag": "goals",
          "date": "2023-05-13T13:46:38.886Z",
          "__v": 0
        },
        {
          "_id": "645f94c6684b63eac33a3a85",
          "user": "645f9460684b63eac33a3a7d",
          "title": "Target internship 2",
          "description": "Exams for internships are to be held in August 2",
          "tag": "goals",
          "date": "2023-05-13T13:46:46.705Z",
          "__v": 0
        },
        {
          "_id": "645f94cc684b63eac33a3a87",
          "user": "645f9460684b63eac33a3a7d",
          "title": "Target internship 3",
          "description": "Exams for internships are to be held in August 3",
          "tag": "goals",
          "date": "2023-05-13T13:46:52.765Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInital);
 

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;