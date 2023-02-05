function getAllDocuments() {
  return ["Title 1", "Title 2", "Title 3", "Title 4"];
}

function getAllDocumentVersions() {
  return [
    {
      title: "Title 1",
      version: 1,
      content: "Hello",
      timestamp: "1pm"
    },
    {
        title: "Title 1",
        version: 4,
        content: "Hello World!!!",
        timestamp: "2pm"
      },
    {
        title: "Title 1",
        version: 2,
        content: "Hello 2",
        timestamp: "2pm"
      },
      {
        title: "Title 1",
        version: 3,
        content: "Hello 3",
        timestamp: "3pm"
      },{
        title: "Title 2",
        version: 1,
        content: "How's it going?",
        timestamp: "6pm"
      },
  ];
}

module.exports = {getAllDocuments, getAllDocumentVersions};
