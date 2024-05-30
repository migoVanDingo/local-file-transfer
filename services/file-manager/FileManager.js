const fs = require("fs")
const path = require("path")

function createLocalStorage(req, res) {
  const projectId = req.params.projectId
  const repoId = req.params.repoId

  const dir ="/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/" + repoId + "/local-storage"

  console.log("LOG: local storage created: ", dir)


  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  // const dir2 =
  //   "/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/local-storage"

  // fs.mkdirSync(dir2)

  console.log("LOG: local storage created: ", dir)

  res.status(200).send({ local_storage_directory: dir })
}

function moveFilesToLocalStorage(req, res) {
  console.log("here guy")
  try {
    console.log("Start Move Files to Local Storage -- entity_id: ", req.params.entity_id)
    console.log("Start Move Files to Local Storage -- dataset_id: ", req.params.dataset_id)
    console.log("Start Move Files to Local Storage -- subset_id: ", req.params.subset_id)
    /* console.log("Start Move Files to Local Storage -- project_id: ", req.params.project_id)
    console.log("Start Move Files to Local Storage -- file_set_id: ", req.params.file_set_id) */

    //const destinationFolder = moveGroundTruthFiles(req.params.projectId)
    const destinationFolder = moveVideoFiles(req.params.entity_id, req.params.dataset_id, req.params.subset_id)
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

function moveVideoFiles(entityId, datasetId, subsetId) {
  try {
    console.log("moveVideoFiles()")
  
    const sourceFolder = "/Users/bubz/Developer/master-project/aolme-backend/_fs/organization/"+entityId+"/dataset/"+datasetId+"/subset/"+subsetId+"/files" // Source folder

    const destinationFolder = "/Users/bubz/Developer/master-project/aolme-backend/_fs/organization/"+entityId+"/dataset/"+datasetId+"/subset/"+subsetId+"/local-storage" // Destination folder
    
    

    // Read the list of files in the source folder
    const files = fs.readdir(sourceFolder, (err, files) => {
      if (err) console.error(err)

      console.log("moveVideoFiles -- Files length: ", files.length)

      // Loop through the files and copy each one to the destination folder
      for (const file of files) {
        const sourceFilePath = path.join(sourceFolder, file)
        const destinationFilePath = path.join(destinationFolder, file)

        if (fs.existsSync(destinationFilePath)) {
          console.log(
            "moveVideoFiles -- File already exists in destination folder"
          )
          return destinationFilePath
        }

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
