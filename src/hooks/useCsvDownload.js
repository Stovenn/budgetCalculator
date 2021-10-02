import { useState, useEffect } from "react";

const useJSONDownload = (expensesList, btnRef) => {
  const [fileName, setFileName] = "myExpenses.csv";
  const [data, setData] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    btnRef.click();
    URL.revokeObjectURL(downloadUrl); // free up storage--no longer needed.
    return () => {};
  }, [downloadUrl]);

  const download = (e) => {
    e.preventDefault();

    let output;
    output = JSON.stringify({ expensesList: expensesList }, null, 4);

    const blob = new Blob([output]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    setDownloadUrl(fileDownloadUrl);
  };

  return { setFileName, download }
};
