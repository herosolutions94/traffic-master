import { useEffect } from "react";

const useDocumentTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = "Loading...";
    }
  }, [title]);
};

export default useDocumentTitle;
