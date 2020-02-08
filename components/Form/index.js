import axios from "axios";

class Form extends React.Component {
  state = {
    selectedFile: null,
    invalidCSV: false,
  };

  handleChange = event => {
    if (event.target.files[0].name.split(".")[1] === "csv") {
      this.setState({
        selectedFile: event.target.files[0],
        invalidCSV: false,
      });
    } else {
      this.setState({
        selectedFile: null,
        invalidCSV: true,
      });
    }
  };

  handleSubmit = () => {
    if (!this.state.invalidCSV) {
      const fd = new FormData();
      fd.append("file", this.state.selectedFile, this.state.selectedFile.name);
      axios.post("http://localhost:3001/upload-csv", fd).then(
        res => {
          this.setState({ invalidCSV: false });
        },
        err => {
          this.setState({ invalidCSV: true });
        }
      );
    }
  };

  render() {
    return (
      <div
        style={{
          border: this.state.invalidCSV
            ? "1px solid #ff0000"
            : "1px solid #888888",
          background: this.state.invalidCSV ? "#ffaaaa" : "#cccccc",
          width: "fit-content",
          padding: "1em",
          margin: "0 auto",
        }}
      >
        {this.state.invalidCSV ? (
          <p>
            INVALID <code>.csv</code> file, please check it's validness
          </p>
        ) : null}
        <input type="file" onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Upload</button>
      </div>
    );
  }
}

export default Form;
