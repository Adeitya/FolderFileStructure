import { useState } from "react";

const FolderUi = ({ data, setData, addFolderId, setAddFolderId }) => {
  const handleOnClick = (node) => {
    if (node?.isFolder === false) return;
    setAddFolderId({});
    setData((prevData) => {
      const update = (data) => {
        return data.map((item) => {
          if (item.name === node.name) {
            return { ...item, isOpen: !item.isOpen };
          }
          if (item.children) {
            return { ...item, children: update(item.children) };
          }
          return item;
        });
      };
      return update(prevData);
    });
  };

  const handleAddClick = (item, type) => {
    if (type !== "Delete") {
      setAddFolderId({ id: item?.id, type: type });
      return;
    }

    setData((prevData) => {
      const deleteData = (cdata) => {
        const temp = cdata
          ?.filter((node) => node?.id !== item?.id)
          ?.map((node) => {
            if (node?.children) {
              return { ...node, children: deleteData(node?.children) };
            }
            return node;
          });
        return temp;
      };

      return deleteData(prevData);
    });
  };

  const handleAddEnter = (e, type) => {
    if (e.key !== "Enter") return;
    setAddFolderId({});
    setData((prevData) => {
      const update = (data) => {
        return data.map((item) => {
          if (item?.id === addFolderId?.id) {
            const newChildArr = [...item?.children];
            const obj = {
              id: Date.now() + Math.random(),
              name: e.target.value,
              isFolder: type === "Folder",
              isOpen: false,
              ...(type === "Folder" && { children: [] }),
            };
            newChildArr.push(obj);
            return {
              ...item,
              isOpen: true,
              children: [...newChildArr],
            };
          }
          if (item.children) {
            return { ...item, children: update(item.children) };
          }
          return item;
        });
      };
      return update(prevData);
    });
  };

  return (
    <div style={{ paddingLeft: 10 }}>
      {data?.map((item) => (
        <div
          key={item.id}
          style={{
            padding: 5,
            borderLeft: "1px solid black",
          }}
        >
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleOnClick(item)}
          >
            {item?.isFolder ? "🗂️ " : "📂 "}
            {item?.name}
          </span>
          {item?.isFolder && (
            <>
              <button
                style={{ marginLeft: 50 }}
                onClick={() => handleAddClick(item, "Folder")}
              >
                +Folder
              </button>
              <button
                style={{ marginLeft: 5 }}
                onClick={() => handleAddClick(item, "File")}
              >
                +File
              </button>
            </>
          )}
          <button
            style={{ marginLeft: 5 }}
            onClick={() => handleAddClick(item, "Delete")}
          >
            ❌
          </button>
          {addFolderId?.id === item?.id && (
            <input
              type="text"
              style={{ margin: 4 }}
              onKeyUp={(e) => handleAddEnter(e, addFolderId?.type)}
            />
          )}
          {item?.isOpen && item?.children && (
            <FolderUi
              data={item?.children}
              setData={setData}
              addFolderId={addFolderId}
              setAddFolderId={setAddFolderId}
            />
          )}
        </div>
      ))}
    </div>
  );
};
export default FolderUi;
