var fs = require("fs")
const moveFilestToLocalStorage = async (req, res) => {
    moveVideoFiles(req.params.projectId)
    //const destinationFolder = moveGroundTruthFiles(req.params.projectId)
    res.status(200).send(JSON.stringify({destination:destinationFolder}))
}

const moveGroundTruthFiles = async(projectId) => {
    try {
        const sourceFolder =
          "/Users/bubz/Developer/master-project/aolme-backend/uploads/" +
          req.params.projectId +
          "/ground-truth-reformat" // Source folder
        const destinationFolder =
          "/Users/bubz/Developer/master-project/aolme-backend/local-storage/" +
          req.params.projectId // Destination folder
    
        // Read the list of files in the source folder
        const files = await fs.readdir(sourceFolder)
    
        // Loop through the files and copy each one to the destination folder
        for (const file of files) {
          const sourceFilePath = path.join(sourceFolder, file)
          const destinationFilePath = path.join(destinationFolder, file)
    
          // Use fs.promises.copyFile for direct file copying
          await fs.copyFile(sourceFilePath, destinationFilePath)
    
        }
    
        console.log("Files copied successfully!")

        return destinationFolder
        
      } catch (error) {
        console.error("Error copying files:", error)
        res.status(400).send("There was a problem copying the files" + err)
      }
}

const moveVideoFiles = async(projectId) => {
    try {
        const sourceFolder =
          "/Users/bubz/Developer/master-project/aolme-backend/uploads/" +
          req.params.projectId +
          "/videos" // Source folder
        const destinationFolder =
          "/Users/bubz/Developer/master-project/aolme-backend/local-storage/" +
          req.params.projectId // Destination folder
    
        // Read the list of files in the source folder
        const files = await fs.readdir(sourceFolder)
    
        // Loop through the files and copy each one to the destination folder
        for (const file of files) {
          const sourceFilePath = path.join(sourceFolder, file)
          const destinationFilePath = path.join(destinationFolder, file)
    
          // Use fs.promises.copyFile for direct file copying
          await fs.copyFile(sourceFilePath, destinationFilePath)
    
        }
    
        console.log("Files copied successfully!")
        
      } catch (error) {
        console.error("Error copying files:", error)
        res.status(400).send("There was a problem copying the files" + err)
      }
}

module.exports = {
  moveFilestToLocalStorage,
}
