function getAllDocuments() {
  return ["Title 1", "Title 2", "Title 3", "Title 4"];
}

function getAllDocumentVersions() {
  return [
    {
      title: "Title 1",
      version: "1",
      content: "Hello",
    },
    {
        title: "Title 1",
        version: "2",
        content: "Hello 2",
      },
      {
        title: "Title 1",
        version: "3",
        content: "Hello 3",
      },{
        title: "Title 2",
        version: "1",
        content: "How's it going?",
      },
  ];
}

module.exports = {getAllDocuments, getAllDocumentVersions};
