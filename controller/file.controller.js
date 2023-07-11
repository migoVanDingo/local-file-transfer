const uploadFile = require("../middleware/upload")
const fs = require("fs")
const xlsx = require("xlsx")

const upload = async (req, res) => {
  try {
    await uploadFile(req, res)

    if (req.file == undefined) {
      console.log("Upload failed...")
      return res.status(400).send({
        message: "Please upload file",
      })
    }

    console.log("File Uploaded...")
    res.status(200).send({
      message: "File uploaded successfully: " + req.file.originalname,
    })
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB",
      })
    }
    res.status(500).send({
      message: `Could not upload the file: ${err}`,
    })
  }
}




const convertXlsx = (req, res) => {
  //Extract the data from the xlsx file
  function getDataXlsx() {
    const file = xlsx.readFile(
      "/Users/bubz/Developer/master-project/local-file-transfer/uploads/gt-ty-30fps.xlsx"
    )

    const sheetNames = file.SheetNames
    const totalSheets = sheetNames.length
    

    let parsedData = []

    for (let i = 1; i < totalSheets; i++) {
      // Convert to json using xlsx
      const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]])

      // Skip header row which is the colum names
      tempData.shift()

      // Add the sheet's json to our data array
      parsedData.push(...tempData)
    }

    return parsedData
  }



  function getUniqueLabels(data) {
    const labelsArr = data.map((d) => d["pseudonym"])

    //get unique labels
    const filterTest = (element, index, array) => {
      return array.indexOf(element) === index
    }

    const uniqueLabels = labelsArr.filter(filterTest)

    return uniqueLabels
  }



  function collectLabelRows(label, data){

    return data.filter(d => d.pseudonym === label && d.pseudonym )

  }



  function buildLabelSequence(labelMatrix){
    const sequence = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        rotation: 0,
        frame: 0,
        enabled: false,
        time: 0,
      }

      //sort ascending by initial frame
      labelMatrix.sort((a,b) => a.f0 > b.f0 ? 1 : -1)

      
      let labelSequence = []
      
      labelMatrix.map((row) => {

        const s1 = Object.create(sequence)
        const s2 = Object.create(sequence)
        
        s1.x = row.w0 / row.W * 100
        s1.y = row.h0 / row.H * 100
        s1.width = row.w / row.W * 100
        s1.height = row.h / row.H * 100
        s1.rotation = 0
        s1.frame = row.f0
        s1.enabled = true
        s1.time = row.f0 / row.FPS


        s2.x = row.w0 / row.W * 100
        s2.y = row.h0 / row.H * 100
        s2.width = row.w / row.W * 100
        s2.height = row.h / row.H * 100
        s2.rotation = 0
        s2.frame = row.f0 + row.f
        s2.enabled = false
        s2.time = (row.f0 + row.f) / row.FPS

        labelSequence = [...labelSequence, s1, s2]

      })

      return labelSequence
  }



  function buildValueObject(sequence, label){
    const value = {
        "framesCount": 20419,
        "duration": 816.733333,
        "labels": [label],
        "sequence": sequence
    }
    console.log(value)

    return value
  }



  function buildResultElementObject(value, label){

    const idArr = {'Jorge':"KCdQqTuhXk", 'Herminio': "7vsTuLEWsn", 'Jacinto':"-IxTKEh7kt", 'Juan': "aD7EFHNIkh", 'Emilio':"8uwtSStDhl"}

    const id = idArr[label]
    console.log("id: ", id)

    const resultElement = {
        "id": id,
        "from_name": "box",
        "to_name": "video",
        "type": "videorectangle",
        "origin": "manual",
        "value": value
    }

    return resultElement
  }




  function buildResult(uniqueLabels, sequence, index){

    const value = buildValueObject(sequence, uniqueLabels[index])

    const resultElement = buildResultElementObject(value, uniqueLabels[index])

    return resultElement
    
  }



  const xlFile = getDataXlsx()
  const uniqueLabels = getUniqueLabels(xlFile)

  const labelRows = uniqueLabels.map((label) => collectLabelRows(label, xlFile))
  const labelSequence = labelRows.map((row) => buildLabelSequence(row))

  const result = labelSequence.map((sequence, index) => buildResult(uniqueLabels, sequence, index))

  //console.log(labelSequence)
 
 

   


  return res.status(200).send(JSON.stringify(result))

  // call a function to save the data in a json file

  /* generateJSONFile(parsedData)
 
 function generateJSONFile(data) {
    try {
     return fs.writeFileSync('data.json', JSON.stringify(data))
    } catch (err) {
    console.error(err)
    }
 } */
}

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/uploads/"

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      })
    }

    let fileInfos = []

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: directoryPath + file,
      })
    })

    res.status(200).send(fileInfos)
  })
}

const download = (req, res) => {
  const fileName = req.params.name
  const directoryPath = __basedir + "/uploads/"

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Couldn't download the file " + err,
      })
    }
  })
}

module.exports = {
  upload,
  getListFiles,
  download,
  convertXlsx,
}
