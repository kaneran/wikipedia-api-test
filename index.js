const express = require("express");
const bp = require("body-parser");
const {
  getAvailableTitles,
  getAvailableRevisions,
  getLatestDocument,
  addNewDocumentRevision,
} = require("./services/documentService");

const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get("/documents", async (req, res) => {
  res.json(getAvailableTitles());
});

app.get("/documents/:title", async (req, res) => {
  const { title } = req.params;
  try {
    res.json(getAvailableRevisions(title));
  } catch (err) {
    res.send(err);
  }
});

app.get("/documents/:title/latest", async (req, res) => {
  const { title } = req.params;
  try {
    res.json(getLatestDocument(title));
  } catch (err) {
    res.send(err);
  }
});

app.post("/documents/:title", async (req, res) => {
    const { title } = req.params;
    const {content} = req.body;
    try {
      addNewDocumentRevision(title,content);
      res.send("Successfully added new revision of document");
    } catch (err) {
      res.send(err);
    }
  });

app.listen(3000);

