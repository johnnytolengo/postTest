import React, { useEffect } from 'react';

import Axios from "axios";
import "./styles.css";
import nerdImg from "./images/nerd.png";

const FILES = [
  { filename: "file1.png"},
  { filename: "file2.png"},
  { filename: "file3.png"},
  { filename: "file4.png"},
  { filename: "file5.png"},
];
export default function App() {

  const [bindata, setBindata] = React.useState(null);

  useEffect(() => {
    fetchAndCovertToBlob(nerdImg);
  }, []);


  const fetchAndCovertToBlob = (url)=> {
    fetch(url)
    .then( response => response.blob())
    .then( blobData => {
        //const {size, type} = blobData
        setBindata(blobData)
    });
  }


  async function postFile(filename, url_path, payload) {
    const config = {
      headers: {
        cache: false,
        processData: false,
        "Content-Type": "multipart/form-data",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    };

    return await Axios.post(url_path, payload, config);
  }

  const handleSendFiles = async () => {
    
    
    FILES.map(async (item, index)  =>  {
      console.log("sending: ", item.filename )

      let formData = new FormData();
      formData.append('blob', bindata);
      formData.append('ord', index);
      formData.append('size', bindata.size);

      
      await postFile(item.filename, "/upload", formData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Sent ", item.filename, " success!");
        }
      })
      .catch((error) => {
        console.log("Error sending: ", item.filename);
      });
      
    });
  };

  return (
    <div className="App">
      <h1>Test send Files</h1>
      <button onClick={handleSendFiles}>SEND FILES</button>
    </div>
  );
}
