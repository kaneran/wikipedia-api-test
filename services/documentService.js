const {
  getAllDocuments,
  getAllDocumentVersions,
} = require("../repositories/documentRepository");
const { validateDocumentTitle } = require("./validationService");

function getAvailableTitles() {
  return getAllDocuments();
}

function getAvailableRevisions(documentTitle) {
  validateDocumentTitle(documentTitle);
  const allRevisions = getAllDocumentVersions();
  const availableRevisions = allRevisions
    .filter((revision) => revision.title === documentTitle)
    .map((revision) => ({
      version: revision.version,
      content: revision.content,
    }));
  return availableRevisions;
}

module.exports = { getAvailableTitles, getAvailableRevisions };
