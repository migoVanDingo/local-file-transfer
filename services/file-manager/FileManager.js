const fs = require("fs")
const path = require("path")

function createLocalStorage(req, res) {
  const projectId = req.params.projectId
  const repoId = req.params.repoId

  const dir ="/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/" + repoId + "/local-storage"

  console.log("LOG: local storage created: ", dir)

  fs.mkdirSync(dir)
  // if (!fs.existsSync(dir)) {
  //   fs.mkdirSync(dir)
  // }
  // const dir2 =
  //   "/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/local-storage"

  // fs.mkdirSync(dir2)

  console.log("LOG: local storage created: ", dir)

  res.status(200).send({ local_storage_directory: dir })
}

function moveFilesToLocalStorage(req, res) {
  console.log("here guy")
  try {
    console.log("Start Move Files to Local Storage: ", req.params.projectId)
    console.log("Start Move Files to Local Storage rid: ", req.params.repoId)

    //const destinationFolder = moveGroundTruthFiles(req.params.projectId)
    const destinationFolder = moveVideoFiles(req.params.projectId, req.params.repoId)
    res.status(200).send(JSON.stringify({ destination: destinationFolder }))
  } catch (error) {
    console.error(error)
    res.status(404).send("Error moving files to local-storage " + error)
  }
}

function moveGroundTruthFiles(projectId) {
  try {
    console.log("moveGroundTruthFiles()")
    const sourceFolder =
      "/Users/bubz/Developer/master-project/aolme-backend/uploads/" +
      projectId +
      "/ground-truth-reformat" // Source folder
    const destinationFolder =
      "/Users/bubz/Developer/master-project/aolme-backend/local-storage/" +
      projectId // Destination folder

    console.log(destinationFolder)

    // Read the list of files in the source folder
    const files = fs.readdir(sourceFolder, (err, files) => {
      if (err) {
        console.err("There was a huge error: ", err)
      }
      console.log("moveGroundTruthFiles -- Files length: ", files.length)
      // Loop through the files and copy each one to the destination folder
      for (const file of files) {
        const sourceFilePath = path.join(sourceFolder, file)
        const destinationFilePath = path.join(destinationFolder, file)

        // Use fs.promises.copyFile for direct file copying
        fs.copyFile(
          sourceFilePath,
          destinationFilePath,
          fs.constants.COPYFILE_EXCL,
          (err, files) => {
            if (err) {
              console.error(
                "moveGroundTruthFiles() -- There was a problem copying files "
              )
            }
          }
        )
      }
    })

    console.log("moveGroundTruthFiles -- Files copied successfully!")

    return destinationFolder
  } catch (error) {
    console.error("Error copying files:", error)
  }
}

function moveVideoFiles(projectId, repoId) {
  try {
    console.log("moveVideoFiles()")
    /* const sourceFolder =
      "/Users/bubz/Developer/master-project/aolme-backend/project/" +
      projectId +
      "/videos" // Source folder
    const destinationFolder =
      "/Users/bubz/Developer/master-project/aolme-backend/project/" +
      projectId +
      "/local-storage" // Destination folder */
    const sourceFolder = "/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/RPSRX342696AGOCBH9773KOY9/videos" // Source folder  
    
    const destinationFolder = "/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/RPSRX342696AGOCBH9773KOY9/local-storage" // Destination folder
    
    

    // Read the list of files in the source folder
    const files = fs.readdir(sourceFolder, (err, files) => {
      if (err) console.error(err)

      console.log("moveVideoFiles -- Files length: ", files.length)

      // Loop through the files and copy each one to the destination folder
      for (const file of files) {
        const sourceFilePath = path.join(sourceFolder, file)
        const destinationFilePath = path.join(destinationFolder, file)

        // Use fs.promises.copyFile for direct file copying
        fs.copyFile(
          sourceFilePath,
          destinationFilePath,
          fs.constants.COPYFILE_EXCL,
          (err, files) => {
            if (err) {
              console.error(
                "moveVideoFiles -- There was a problem copying files ",
                err
              )
            }
          }
        )
      }
    })

    console.log("moveVideoFiles -- Files copied successfully!")
    return destinationFolder
  } catch (error) {
    console.error("Error copying files:", error)
    res.status(400).send("There was a problem copying the files" + err)
  }
}

module.exports = {
  createLocalStorage,
  moveFilesToLocalStorage,
}
