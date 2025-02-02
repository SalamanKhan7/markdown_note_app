import React, { useState } from "react";

const NoteTakingApp = () => {
  const [markdown, setMarkdown] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [grammarErrors, setGrammarErrors] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/markdown") {
      const reader = new FileReader();
      reader.onload = () => {
        setMarkdown(reader.result);
        checkGrammar(reader.result); // Optional, for grammar checking
      };
      reader.readAsText(file);
    }
  };

  const checkGrammar = async (text) => {
    // const errors = await checkGrammarAPI(text); // Use your API call here
    // setGrammarErrors(errors);
  };

  const saveNote = () => {
    // Logic for saving note (e.g., to local storage or a backend)
    // setHtmlContent(parseMarkdown(markdown));
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Write your markdown content here..."
      />
      <button onClick={saveNote}>Save Note</button>
      <div>
        <h2>Preview:</h2>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
      <div>
        {grammarErrors.length > 0 && (
          <ul>
            {grammarErrors.map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
          </ul>
        )}
      </div>
        
    </div>
  );
};
export default NoteTakingApp;
