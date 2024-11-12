export function getCurrentDateFormatted() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day} ${months[month - 1]} ${year}`;
}

export const downloadNote = ({noteTitle,noteBody}) => {
  // Create a blob with the note content
  const blob = new Blob([`Title: ${noteTitle}\n\n${noteBody}`], {
    type: "text/plain",
  });

  // Create a link element
  const link = document.createElement("a");

  // Set the download attribute with a filename
  link.download = `${noteTitle || "Untitled Note"}.txt`;

  // Create a URL for the blob and set it as the href attribute
  link.href = window.URL.createObjectURL(blob);

  // Append the link to the body (required for Firefox)
  document.body.appendChild(link);

  // Programmatically click the link to trigger the download
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
};
