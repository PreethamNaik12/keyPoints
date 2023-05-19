import NewNotebtn from "./NewNotebtn"
import Notes from "./Notes"


export default function Home(props) {

  return (
    <div style={{
      margin: '5rem auto auto auto',
    }}>
      
      <Notes showAlert={props.showAlert}/>
      <NewNotebtn/>
    </div>
      
  )
}

