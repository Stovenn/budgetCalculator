import { useState, useEffect, useRef } from "react";

const useDownload = (expensesList, btnRef) => {
  const fileName = `expenses_${new Date().toLocaleDateString()}.json`;
  const [downloadUrl, setDownloadUrl] = useState("");
  const initialRender = useRef(true)

  useEffect(() => {
    if(!initialRender.current) {
      console.log(btnRef)
      btnRef.current.click()
      URL.revokeObjectURL(downloadUrl); // free up storage--no longer needed.
    }else {
      initialRender.current = false
    }
    return () => {};
  }, [downloadUrl]);

  const download = (e) => {
    e.preventDefault();

    let output;
    output = JSON.stringify({ expensesList: expensesList }, null, 4);

    const blob = new Blob([output], {});
    const fileDownloadUrl = URL.createObjectURL(blob);
    setDownloadUrl(fileDownloadUrl);
  };

  return {fileName, download, downloadUrl}
};

export default useDownload
