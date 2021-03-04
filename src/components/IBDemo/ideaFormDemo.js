import React from "react";
import ReactDOM from "react-dom";
import DummyAPI from "../../api/DummyAPI";
import { Button } from "@material-ui/core";

const {postIdeaAsync} = DummyAPI();

const postIdea = async (user, title, body, cat) => {
  const post = {
    title: title,
    body: body,
    votes: 0,
    catory: cat,
  };
  try {
    const postRequest = await postIdeaAsync(user.id, post);
    console.log(postRequest);
    window.location.reload();
  } catch (e) {
    console.log("error posting an idea");
    console.log(e);
  }
};

class IdeaFormDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      cat: "",
    };
  }


  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  };

  render() {
      let user = this.props.data;
    return (
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
        <br />
        <br />
        <Button variant="outlined" color="primary" onClick={() => postIdea(user, this.state.title, this.state.body, this.state.cat)}>
          Click me to submit the idea
        </Button>
      </form>
    );
  }
}

ReactDOM.render(<IdeaFormDemo />, document.getElementById("root"));

export default IdeaFormDemo;
