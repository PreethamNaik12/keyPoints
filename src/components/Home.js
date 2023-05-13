import Notes from "./Notes"


export default function Home() {

  return (
    <div style={{
      margin: '5rem auto auto auto',
    }}>
      <div>
        <h1>Add a note</h1>
        <form>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Title</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Give a title'/>
              <div id="emailHelp" className="form-text">Choose a catchy keyword for your keypoints</div>
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">Description</label>
              <textarea className="form-control" id="exampleInputPassword1" placeholder='Keypoints go here.....' />
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
      <Notes />
    </div>
      
  )
}

