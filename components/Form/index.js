import axios from "axios";

class Form extends React.Component {
  state = {
    selectedFile: null,
    csvIsInvalid: false,
    fileConfirmed: false,
  };

  handleChange = event => {
    if (event.target.files[0].name.split(".")[1] === "csv") {
      this.setState({
        selectedFile: event.target.files[0],
        csvIsInvalid: false,
      });
    } else {
      this.setState({
        selectedFile: null,
        csvIsInvalid: true,
      });
    }
  };

  handleSubmit = () => {
    if (!this.state.csvIsInvalid && this.state.selectedFile) {
      const fd = new FormData();
      fd.append("file", this.state.selectedFile, this.state.selectedFile.name);
      axios.post("http://localhost:3030/upload-csv", fd).then(
        res => {
          this.setState({ csvIsInvalid: false, fileConfirmed: true });
          console.log(`FILE CONFIRMED SUCCESSFULLY`);
        },
        err => {
          this.setState({ csvIsInvalid: true });
          console.error(`FILE FAILED VALIDATION`);
        }
      );
    }
  };

  render() {
    return (
      <div
        style={{
          border: this.state.csvIsInvalid ? "1px solid #ff0000" : "1px solid #888888",
          background: this.state.csvIsInvalid ? "#ffaaaa" : "#cccccc",
          width: "fit-content",
          padding: "1em",
          margin: "0 auto",
        }}
      >
        {this.state.csvIsInvalid ? (
          <p>
            INVALID <code>.csv</code> file, please check it's validness
          </p>
        ) : null}
        <input type="file" onChange={this.handleChange} />
        <button onClick={this.handleSubmit} style={{color:this.state.fileConfirmed ? "#008800" : "#000000"}}>
          Upload{this.state.fileConfirmed ? "ed" : ""}
        </button>
      </div>
    );
  }
}

export default Form;
