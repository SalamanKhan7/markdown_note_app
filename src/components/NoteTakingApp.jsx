import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./NoteTakingApp.css";
import { Button, Typography, Box } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { markdownFileApis } from "../Data/axios";
import StatusAlert from "../StatusAlert/StatusAlert";
import axios from "axios";

const NoteTakingApp = () => {
  const [markdown, setMarkdown] = useState("");
  const [markdownShow, setMarkdownShow] = useState(true);
  const [markdownAllFiles, setMarkdownAllFiles] = useState(false);
  const [markdownError, setMarkdownError] = useState(true);
  const [showMarkdown, setShowMarkdown] = useState(false);
  const [markdownBtn, setMarkdownBtn] = useState(false);
  const [getAllMarkdown, setGetAllMarkdown] = useState([]);
  const [grammarErrors, setGrammarErrors] = useState([]);
  const [fileName, setFileName] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");

  //add the markdown file
  const uploadMarkdown = () => {
    setShowMarkdown(true);
    setMarkdownAllFiles(false);
    setMarkdownError(true);
    setMarkdownShow(true);
    setFileName("");
    setGetAllMarkdown([]);
    setMarkdown("");
    setGrammarErrors([]);
  };

  // uploading the markdown file
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        handleCheckGrammar(reader.result);
      };
      reader.readAsText(file);
    }
  };

  // checking the grammatical error in the uploaded markdown file
  const checkGrammarAPI = async (text) => {
    try {
      const result = await markdownFileApis.checkGrammer(text);
      setMarkdown(text);
      setMarkdownBtn(true);
      return result.errors || [];
    } catch (error) {
      console.error("Error checking grammar:", error);
      return [];
    }
  };

  //handling the api of grammatical
  const handleCheckGrammar = async (text) => {
    const errors = await checkGrammarAPI(text);
    setGrammarErrors(errors);
  };

  //save the uploaded file
  const saveNote = async () => {
    try {
      const result = await markdownFileApis.add(markdown);
      showAlert("Markdown note file added successfully!!", "success");
      return result.message || [];
    } catch (error) {
      showAlert("Failed to add the markdown files", "warning");
      console.error("Error checking grammar:", error);
      return [];
    }
  };

  //retreived all uploaded markdown files
  const getAllData = async () => {
    try {
      setShowMarkdown(false);
      setMarkdownBtn(false);
      setMarkdownShow(false);
      setMarkdownError(false);
      setFileName("");
      setGrammarErrors([]);
      setMarkdown("");
      setMarkdownAllFiles(true);
      const result = await markdownFileApis.getAll();
      showAlert("Get all the markdown files successfully!!", "success");
      setGetAllMarkdown(result || []);
      return;
    } catch (error) {
      showAlert("Failed to get markdown files", "warning");
      console.error("Error checking grammar:", error);
      return [];
    }
  };

  //show the alert
  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };
  return (
    <Box>
      <Box className="getFile">
        <button onClick={uploadMarkdown} className="add-markdown-btn">
          Add Markdown
        </button>
        <button onClick={getAllData} className="show-markdown-btn">
          Show All Markdown
        </button>
      </Box>

      {/* Uploading the markdown file */}
      {showMarkdown && (
        <div className="upload-container">
          <input
            accept=".md"
            style={{ display: "none" }}
            id="upload-button"
            type="file"
            onChange={handleFileUpload}
          />
          <label htmlFor="upload-button">
            <Button
              variant="contained"
              component="span"
              startIcon={<UploadFileIcon />}
              className="upload-button"
            >
              Upload Markdown File
            </Button>
          </label>
          {fileName && (
            <Typography className="file-name">
              Selected File: {fileName}
            </Typography>
          )}
          {markdownBtn && (
            <button
              onClick={saveNote}
              disabled={grammarErrors.length > 0}
              className="add-markdown-btn"
            >
              Save Markdown
            </button>
          )}
        </div>
      )}

      {/* Preview of uploaded Markdown file */}
      {markdown && markdownShow && (
        <Box className="preview-container">
          <Typography variant="h5" className="preview-title">
            Preview:
          </Typography>
          <Box className="markdown-preview">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </Box>
        </Box>
      )}

      {/* Showing Error inside uploaded Markdown file */}
      {grammarErrors.length > 0 && markdownError && (
        <Box className="error-container">
          <Typography variant="h5" className="error-title">
            Error
          </Typography>
          {grammarErrors.length > 0 && (
            <ul className="error-list">
              {grammarErrors.map((error, index) => (
                <li key={index} className="error-item">
                  {error}
                </li>
              ))}
            </ul>
          )}
        </Box>
      )}

      {/* Showing All uploaded Markdown file */}
      {markdownAllFiles && (
        <Box className="container">
          {getAllMarkdown.map((item) => (
            <Box key={item._id} className="markdown-box">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {item.content}
              </ReactMarkdown>
            </Box>
          ))}
        </Box>
      )}
      <StatusAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        message={alertMessage}
        severity={alertSeverity}
      />
    </Box>
  );
};
export default NoteTakingApp;
