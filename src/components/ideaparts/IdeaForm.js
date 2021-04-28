import React from "react";
import BackendAPI from "../../api/BackendAPI";
import { Button, Container } from "@material-ui/core";
//import { navigate } from "hookrouter";

const {postIdeaAsync} = BackendAPI();

const postIdea = async (user, title, body, cat, department) => {
  const data = {
    senderId: JSON.parse(window.localStorage.getItem("user")).fName +" "+ JSON.parse(window.localStorage.getItem("user")).lName,
    category: cat,
    title: title,
    body: body,
    department: department,
    upvotes: 0,
  };

  const res = await postIdeaAsync(data)
  if (res.status === 200) {
      //navigate('/idea-barrel')
      window.location.reload();

  } else if (res.status === 400) {
      console.log("Unable to submit idea", res.json())
  } else {
      console.log("This shouldn't happend")
  }
}

class IdeaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      cat: "",
      department:"HR",
    };
  }


  myChangeHandler = (event) => {
    event.preventDefault();
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  };

  render() {
      let user = this.props.data;
    return (
      <Container maxWidth="xs" style={{border: 'solid 2px blue'}}>
      <form>
        <h1>
          Submit an idea {this.state.username} {this.state.age}
        </h1>
        <p>Title</p>
        <input type="text" name="title" onChange={this.myChangeHandler} />
        <p>Description</p>
        <input type="text" name="body" onChange={this.myChangeHandler} />
        <p>Category</p>
        <input type="text" name="cat" onChange={this.myChangeHandler} />
        <p>Recipient department</p>
        <select name="department" onChange={this.myChangeHandler}>
    <option value="HR">HR</option>
    <option value="Cloud Computing">Cloud Computing</option>
    <option value="5G Networks">5G Networks</option>
</select>
        <br />
        <br />
        <Button variant="outlined" onClick={() => postIdea(user, this.state.title, this.state.body, this.state.cat, this.state.department)}>
          Click me to submit the idea
        </Button>
      </form>
      </Container>
    );
  }
}

export default IdeaForm;
