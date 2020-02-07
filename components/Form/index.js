import axios from "axios";

class Form extends React.Component {
  state = {
    selectedFile: null,
  };

  handleChange = event => {
    if (event.target.files[0].name.split(".")[1] === "csv") {
      this.setState({
        selectedFile: event.target.files[0],
      });
    } else alert("choose an .csv file, or you will crash the app!!!");
  };

  handleSubmit = () => {
    const fd = new FormData();
    fd.append("file", this.state.selectedFile, this.state.selectedFile.name);
    axios.post("http://localhost:3001/upload-csv", fd).then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleChange} required />
        <button onClick={this.handleSubmit}>Upload</button>
      </div>
    );
  }
}

export default Form;
