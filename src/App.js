import { useState } from "react";
import "./styles.css";
import json from "./data.json";
import FolderUi from "./components/FolderUi";

export default function App() {
  const [data, setData] = useState(json);
  const [addFolderId, setAddFolderId] = useState({});

  return (
    <div className="App">
      <h1>Folder/File Structure</h1>
      <FolderUi
        data={data}
        setData={setData}
        addFolderId={addFolderId}
        setAddFolderId={setAddFolderId}
      />
    </div>
  );
}
