import Axios from "axios";
import "./styles.css";

const FILES = [{ filename: "file1.txt", data: "" }];
export default function App() {
  async function postFile(filename, url_path, payload) {
    const config = {
      headers: {
        cache: false,
        processData: false,
        "Content-Type": "multipart/form-data",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    };

    return await Axios.post(APIURL + url_path, payload, config);
  }

  const handleSendFiles = () => {
    console.log("sending...");
  };

  return (
    <div className="App">
      <h1>Test send Files</h1>
      <button onClick={handleSendFiles}>SEND FILES</button>
    </div>
  );
}
