import NewNotebtn from "./NewNotebtn";
import Notes from "./Notes";
import Authorization from "./Authorization";

export default function Home(props) {

  return (
    <>

    {!localStorage.getItem('token') && <Authorization/>}
      <div style={{
        margin: '5rem auto auto auto',
      }}>

        <Notes showAlert={props.showAlert} />
        <NewNotebtn />
      </div>
    </>

  )
}

