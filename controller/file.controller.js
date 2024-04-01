const uploadFile = require("../middleware/upload")
const fs = require("fs")
const { type } = require("os")
const xlsx = require("xlsx")

//const num = 20190221

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
////////////////////////////////////////////////////////////////////////////////////////////////////
const doTest = (req, res) => {
  const data = req.query.id
  console.log("Req.body oy: ", data)
  if(data){
    return res.status(200).send(JSON.stringify(data))
  } else {
    return res.status(400).send("No data")
  }
}
const convertXlsx = (req, res) => {
  const num = req.params.file_set_id
  console.log("numNUM: ", num)
  

  //Extract the data from the xlsx file
  const repoId = req.params.repo_id
  console.log("repoId: ", repoId)
  function getDataXlsx() {
    let file
    let fileArr = []

    switch (num) {
      case 1:
        file = xlsx.readFile(
          "/Users/bubz/Developer/master-project/local-file-transfer/uploads/talking_instances.xlsx"
        )
        break

      case 3:
        file = xlsx.readFile(
          "/Users/bubz/Developer/master-project/local-file-transfer/uploads/ivonne-typing/ivone-typing.xlsx"
        )
        break

      case 101:
        
        getFiles = fs.readdir(
          "/Users/bubz/Developer/master-project/aolme-backend/project/" +
            projectId +
            "/ground-truth-raw",
          (err, files) => {
            if(err)
              console.error("It didn't work: ", err)
              fileArr.push(files.map(file => file))
          }
        )
        
        file = xlsx.readFile(
          "/Users/bubz/Developer/master-project/aolme-backend/project/" +
            projectId +
            "/ground-truth-raw/gt-ty-30fps.xlsx")

      // FILES FOR TESTING
      case 20170330:
        /* getFiles = fs.readdir(
          "/Users/bubz/Developer/master-project/aolme-backend/_raw_files/Typing/C1L1P-C/20170330",
          (err, files) => {
            if(err)
              console.error("It didn't work: ", err)
              fileArr.push(files.map(file => file))
          }
        ) */
        
        file = xlsx.readFile(
          "/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/ground-truth-raw/gt-ty-30fps.xlsx")
      
        break

      case 20170413:
        /* getFiles = fs.readdir(
          "/Users/bubz/Developer/master-project/aolme-backend/_raw_files/Typing/C1L1P-C/20170413",
          (err, files) => {
            if(err)
              console.error("It didn't work: ", err)
              fileArr.push(files.map(file => file))
          }
        ) */
        
        file = xlsx.readFile(
          "/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/ground-truth-raw/gt-ty-30fps.xlsx")
      
        break 


      case 20170302:
        /* getFiles = fs.readdir(
          "/Users/bubz/Developer/master-project/aolme-backend/_raw_files/Typing/C1L1P-E/20170302",
          (err, files) => {
            if(err)
              console.error("It didn't work: ", err)
              fileArr.push(files.map(file => file))
          }
        ) */
        
        file = xlsx.readFile(
          "/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/ground-truth-raw/gt-ty-30fps.xlsx")
      
        break 
      
      case 20180223:
        /* getFiles = fs.readdir(
          "/Users/bubz/Developer/master-project/aolme-backend/_raw_files/Typing/C2L1P-B/20180223",
          (err, files) => {
            if(err)
              console.error("It didn't work: ", err)
              fileArr.push(files.map(file => file))
          }
        ) */
        
        file = xlsx.readFile(
          "/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/ground-truth-raw/gt-ty-30fps.xlsx")
      
        break 


      case 20180308:
        /* getFiles = fs.readdir(
          "/Users/bubz/Developer/master-project/aolme-backend/_raw_files/Typing/C2L1P-D/20180308",
          (err, files) => {
            if(err)
              console.error("It didn't work: ", err)
              fileArr.push(files.map(file => file))
          }
        ) */
        
        file = xlsx.readFile(
          "/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/ground-truth-raw/gt-ty-30fps.xlsx")
      
        break 

      case 20190411:
        /* getFiles = fs.readdir(
          "/Users/bubz/Developer/master-project/aolme-backend/_raw_files/Typing/C3L1P-C/20190411",
          (err, files) => {
            if(err)
              console.error("It didn't work: ", err)
              fileArr.push(files.map(file => file))
          }
        ) */
        
        file = xlsx.readFile(
          "/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/ground-truth-raw/gt-ty-30fps.xlsx")
      
        break

      case 20190221:
        /* getFiles = fs.readdir(
          "/Users/bubz/Developer/master-project/aolme-backend/_raw_files/Typing/C3L1P-D/20190221",
          (err, files) => {
            if(err)
              console.error("It didn't work: ", err)
              fileArr.push(files.map(file => file))
          }
        ) */
        
        file = xlsx.readFile(
          "/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/ground-truth-raw/gt-ty-30fps.xlsx")
      
        break
        
      default:
        file = xlsx.readFile(
          "/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/ground-truth-raw/gt-ty-30fps.xlsx")
        break
    }

    
   
    const sheetNames = file.SheetNames
    const totalSheets = sheetNames.length
    console.log("totalSheets: ", totalSheets)

    let parsedData = []

    //This for loop gets the 2nd sheet of the spreadsheet
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
    //const allVideoRows = data.filter(d => d.name === video)

    const labelsArr = data.map((d) => d["pseudonym"])

    //get unique labels
    const filterTest = (element, index, array) => {
      return element !== false && array.indexOf(element) === index
    }

    const uniqueLabels = labelsArr.filter(filterTest)

    return uniqueLabels
  }

  function collectLabelRows(label, data) {
    return data.filter((d) => d.pseudonym === label && d.pseudonym)
  }

  function buildLabelSequence(labelMatrix) {
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
    labelMatrix.sort((a, b) => (a.f0 > b.f0 ? 1 : -1))

    let labelSequence = []

    labelMatrix.map((row) => {
      const s1 = Object.create(sequence)
      const s2 = Object.create(sequence)

      s1.x = (row.w0 / row.W) * 100
      s1.y = (row.h0 / row.H) * 100
      s1.width = (row.w / row.W) * 100
      s1.height = (row.h / row.H) * 100
      s1.rotation = 0
      s1.frame = row.f0
      s1.enabled = true
      s1.time = row.f0 / row.FPS

      if (s1.frame === 0) {
        s1.frame = 1
      }

      s2.x = (row.w0 / row.W) * 100
      s2.y = (row.h0 / row.H) * 100
      s2.width = (row.w / row.W) * 100
      s2.height = (row.h / row.H) * 100
      s2.rotation = 0
      s2.frame = Math.floor(row.f0 + row.f)
      s2.enabled = false
      s2.time = (s1.frame + row.f) / row.FPS

      labelSequence = [...labelSequence, s1, s2]
    })

    return labelSequence
  }

  function buildValueObject(sequence, label, index, i) {

    let frames = 0
    let duration = 0
    console.log("index: ", index + " == " + typeof(index))
    console.log("i: ", i+ " == " + typeof(i))
    console.log("num: ", num+ " == " + typeof(num))


    switch(parseInt(num)){
      case 20170330:
    
          frames = 56460
          duration = 941.9410
        /* else if (i === 1){
          frames = 57930
          duration = 966.4655
        } else if (i === 2){
          frames = 57930
          duration = 966.4655
        } else if (i === 3){
          frames = 57930
          duration = 966.4655
        } else if (i === 4){
          frames = 57930
          duration = 966.4655
        } else if (i === 5){
          frames = 56460
          duration = 941.9410
        } */
    
        break

      case 20170413:
        if(i === 0){
          frames = 57990
          duration = 967.4665
        } else if (i === 1){
          frames = 58020
          duration = 967.9670
        } else if (i === 2){
          frames = 58020
          duration = 967.9670
        } else if (i === 3){
          frames = 23820
          duration = 397.3970
        } 
        break;

      case 20170302:
        if(i === 0){
          frames = 24504
          duration = 816.800000
        } else if (i === 1){
          frames = 24502
          duration = 816.733333
        } else if (i === 2){
          frames = 9
          duration = 0.300000
        }
        break;

      case 20180223:
        if(i === 0){
          frames = 42720
          duration = 1425.424
        } else if (i === 1){
          frames = 42720
          duration = 1425.424
        } else if (i === 2){
          frames = 42720
          duration = 1425.424
        } else if (i === 3){
          frames = 42720
          duration = 1425.424
        } else if (i === 4){
          frames = 11790
          duration = 393.393
        } 
        break;

      case 20180308:
        if(i === 0){
          frames = 42720
          duration = 1425.4240
        } else if (i === 1){
          frames = 42720
          duration = 1425.4240
        } else if (i === 2){
          frames = 42720
          duration = 1425.4240
        } else if (i === 3){
          frames = 20715
          duration = 691.1905
        } 
        break;

      case 20190411:
        if(i === 0){
          frames = 42720
          duration = 1425.424
        } else if (i === 1){
          frames = 42720
          duration = 1425.424
        } 
        break;

      case 20190221:
        if(i === 0){
          frames = 42735
          duration = 1425.9245
        } else if (i === 1){
          frames = 42735
          duration = 1425.9245
        } else if (i === 2){
          frames = 42735
          duration = 1425.9245
        } else if (i === 3){
          frames = 42735
          duration = 1425.9245
        } else if (i === 4){
          frames = 19890
          duration = 663.6630
        } 
        break;
      
      default:
        console.log("THE DEFAULT CASE")
        break;
    }

    console.log("frames: ", frames)
    console.log("duration: ", duration)

    const value = {
      framesCount: frames,
      duration: duration,
      labels: [label],
      sequence: sequence,
    }
    //console.log("value: ", value)

    return value
  }

  function buildResultElementObject(value, label) {
    const idArr = {
      jorge: "CPhh0tN4kD",
      herminio: "RIq94Ga-ME",
      jacinto: "h6QgPIgXQa",
      juan: "bXkbK91AHG",
      emilio: "G7-FZnyKPs",
    }

    const idArr2 = {
      Windy: "u6pQVnWeOf",
      Trigo: "84uDwHHwc2",
      Cindy: "oabhpk5vjI",
      Carmen: "P48aNXok3p",
      Marina: "HenVUsL3rj",
      Marta: "p3gsB9CNU5",
      Sylvia: "abc12345",
      Barraza: "xyz98766",
      Anthony: "nop5329761",
    }

    const idArr3 = {
      Katiana: "Dj0wOASaz3",
      Maya: "kgSrfSyBWC",
      Marcia: "7KDXRsxp8Y",
      Jacob: "iH8NUxGPBR",
    }
    function makeid(length) {
      let result = ""
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      const charactersLength = characters.length
      let counter = 0
      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
        counter += 1
      }
      return result
    }

    let id = makeid(10)

    /* switch(num){
        case 1:
            id = idArr[label]
            break;
        
        case 2:
            id = idArr2[label]
            break;
        
        case 3: 
            id = idArr3[label]
            break;

        default:
            break
    } */

    const resultElement = {
      id: id,
      from_name: "box",
      to_name: "video",
      type: "videorectangle",
      origin: "manual",
      value: value,
    }

    return resultElement
  }

  function buildResult(uniqueLabels, sequence, index, i) {
    const value = buildValueObject(sequence, uniqueLabels[index], i)

    const resultElement = buildResultElementObject(value, uniqueLabels[index])

    return resultElement
  }

  function createAnnotationsObject(result) {
    const annotation = {
      result: result,
    }

    const annotationArr = [annotation]

    return annotationArr
  }

  function createTaskArray(annotations, index) {
    let video

    /* if (num === 1) {
      switch (index) {
        case 0:
          video = "/data/upload/30/bd1ea630-G-C1L1P-Apr13-C-Windy_q2_01-07.mp4"
          break

        case 1:
          video = "/data/upload/30/e5fbc3dd-G-C1L1P-Apr13-C-Windy_q2_02-07.mp4"
          break

        case 2:
          video = "/data/upload/30/0a0cbfc9-G-C1L1P-Apr13-C-Windy_q2_03-07.mp4"
          break

        case 3:
          video = "/data/upload/30/1ead0ba6-G-C1L1P-Apr13-C-Windy_q2_04-07.mp4"
          break

        case 4:
          video = "/data/upload/30/fc9fbcb1-G-C1L1P-Apr13-C-Windy_q2_05-07.mp4"
          break

        case 5:
          video = "/data/upload/30/31c1cd68-G-C1L1P-Apr13-C-Windy_q2_06-07.mp4"
          break

        case 6:
          video = "/data/upload/30/3bd7c439-G-C1L1P-Apr13-C-Windy_q2_07-07.mp4"
          break
      }
    } else {
      switch (index) {
        case 0:
          video = "/data/upload/31/0f94a9d5-G-C3L1P-Feb21-D-Ivonne_q2_01-05.mp4"
          break

        case 1:
          video = "/data/upload/31/55f9af10-G-C3L1P-Feb21-D-Ivonne_q2_02-05.mp4"
          break

        case 2:
          video = "/data/upload/31/26f534c9-G-C3L1P-Feb21-D-Ivonne_q2_03-05.mp4"
          break

        case 3:
          video = "/data/upload/31/234b0bdc-G-C3L1P-Feb21-D-Ivonne_q2_04-05.mp4"
          break

        case 4:
          video = "/data/upload/31/04072f67-G-C3L1P-Feb21-D-Ivonne_q2_05-05.mp4"
          break
      }
    } */

    if (parseInt(num) === 20170330){
      switch (index) {
        /* case 0:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C1L1P-Mar30-C-Kelly_q2_01-06.mp4"
          break
        
        case 1:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C1L1P-Mar30-C-Kelly_q2_02-06.mp4"
          break

        case 2:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C1L1P-Mar30-C-Kelly_q2_03-06.mp4"
          break

        case 3:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C1L1P-Mar30-C-Kelly_q2_04-06.mp4"
          break

        case 4:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C1L1P-Mar30-C-Kelly_q2_05-06.mp4"
          break */

        case 0:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C1L1P-Mar30-C-Kelly_q2_06-06.mp4"
          break
        
        default:
          break;
      }

    } else if (parseInt(num) === 20170413){
      
      switch (index) {
      case 0:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C1L1P-Apr13-C-Windy_q2_03-07.mp4"
          break

      case 1:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C1L1P-Apr13-C-Windy_q2_05-07.mp4"
          break

      case 2:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C1L1P-Apr13-C-Windy_q2_06-07.mp4"
          break

      case 3:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C1L1P-Apr13-C-Windy_q2_07-07.mp4"
          break

      }
    } else if (parseInt(num) === 20170302){

      switch(index){


        case 0:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C1L1P-Mar02-E-Irma_q2_01-08.mp4"
          break

        case 1:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C1L1P-Mar02-E-Irma_q2_02-08.mp4"
          break

        case 2:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C1L1P-Mar02-E-Irma_q2_03-08.mp4"
          break

        default:
          break;
      }

        


    } else if (parseInt(num) === 20180223){

      switch(index){

        case 0:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C2L1P-Feb23-B-Shelby_q2_02-06.mp4"
          break

        case 1:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C2L1P-Feb23-B-Shelby_q2_03-06.mp4"
          break

        case 2:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C2L1P-Feb23-B-Shelby_q2_04-06.mp4"
          break

        case 3:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C2L1P-Feb23-B-Shelby_q2_05-06.mp4"
          break

        case 4:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C2L1P-Feb23-B-Shelby_q2_06-06.mp4"
          break

   
        default:
          break;
      }

    } else if (parseInt(num) === 20180308){

      switch(index){
        
        case 0:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C2L1P-Mar08-D-Chaitu_q2_02-05.mp4"
          break

        case 1:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C2L1P-Mar08-D-Chaitu_q2_03-05.mp4"
          break

        case 2:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C2L1P-Mar08-D-Chaitu_q2_04-05.mp4"
          break

        case 3:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C2L1P-Mar08-D-Chaitu_q2_05-05.mp4"
          break

        


        default:
          break;
      }


    } else if (parseInt(num) === 20190411){
      
      switch(index){

        case 0:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C3L1P-Apr11-C-Phuong_q2_03-05.mp4"
          break

        case 1:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C3L1P-Apr11-C-Phuong_q2_03-05.mp4"
          break
        default:
          break;
      }

    } else if (parseInt(num) === 20190221){
      switch(index){

        case 0:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C3L1P-Feb21-D-Ivonne_q2_01-05.mp4"
          break

        case 1:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C3L1P-Feb21-D-Ivonne_q2_02-05.mp4"
          break

        case 2:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C3L1P-Feb21-D-Ivonne_q2_03-05.mp4"
          break

        case 3:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C3L1P-Feb21-D-Ivonne_q2_04-05.mp4"
          break

        case 4:
          video = "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/local-storage/G-C3L1P-Feb21-D-Ivonne_q2_05-05.mp4"
          break

        default:
          break;
      }
    }

    console.log("num: " + num + " index: " + index + " video: " + video)

    if (num === 101) {
      switch (index) {
        case 0:
          video =
            "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/project/" +
            projectId +
            "/local-storage/G-C2L1P-Feb23-B-Shelby_q2_02-06.mp4"
          break

        case 1:
          video =
            "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/project/" +
            projectId +
            "/local-storage/G-C2L1P-Feb23-B-Shelby_q2_03-06.mp4"
          break

        case 2:
          video =
            "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/project/" +
            projectId +
            "/local-storage/G-C2L1P-Feb23-B-Shelby_q2_04-06.mp4"
          break

        case 3:
          video =
            "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/project/" +
            projectId +
            "/local-storage/G-C2L1P-Feb23-B-Shelby_q2_05_06.mp4"
          break

        case 4:
          video =
            "/data/local-files/?d=/Users/bubz/Developer/master-project/aolme-backend/project/" +
            projectId +
            "/local-storage/G-C2L1P-Feb23-B-Shelby_q2_06-06.mp4"
          break
      }
    }

    const task = {
      data: {
        video: video,
      },
      annotations: annotations,
    }

    const taskArr = [task]

    return taskArr
  }

  function getUniqueVideos(data) {
    const videosArr = data.map((d) => d["name"] != false && d["name"])

    //get unique vidoes
    const filterTest = (element, index, array) => {
      return array.indexOf(element) === index
    }

    const uniqueVideos = videosArr.filter(filterTest)

    return uniqueVideos
  }

  function getVideoRows(video, data) {
    const rows = data.filter((d) => d.name === video)

    return rows
  }

  console.log("here 1")
  const xlFile = getDataXlsx()
  console.log("here 2")
  const uniqueVideos = getUniqueVideos(xlFile)
  //const uniqueLabels = getUniqueLabels(xlFile)
  console.log("here 3")
  const videoRows = uniqueVideos.map((video) => getVideoRows(video, xlFile))
  console.log("here 4")
  const uniqueLabelsArr = videoRows.map((row) => getUniqueLabels(row))
  console.log("here 5")
  //Each row is all entries for a given video. Sorted by pseudonym
  const labelRows = uniqueLabelsArr.map((uniqueLabels, index) =>
    uniqueLabels.map((label) => collectLabelRows(label, videoRows[index]))
  )
  console.log("here 6")
  const labelSequence = labelRows.map((row, index) => {
    //each row is a file, each child of row is a pseudonym
    //So we need to loop through the file and build the labelSequence for each pseudonym for every file
    return row.map((pn) => buildLabelSequence(pn))
  })
  console.log("here 7")

  const result = labelSequence.map((allFileSequences, index) => {
    return allFileSequences.map((sequence, childIndex) =>
      buildResult(uniqueLabelsArr[index], sequence, childIndex, index)
    )
  })

  console.log("here 8")
  const annotations = result.map((res, index) => createAnnotationsObject(res))
  console.log("here 9")
  const tasks = annotations.map((annotation, index) =>
    createTaskArray(annotation, index)
  )
  console.log("here 10")

  const uploadedFile = tasks.map((task, index) =>
    createFile(task, uniqueVideos[index], repoId)
  )
  console.log(uniqueLabelsArr)
  console.log("here 11")

  return res.status(200).send(JSON.stringify(uniqueLabelsArr))
}

////////////////////////////////////////////////////////////////////////////////////////////////////

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/project/"

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
  const directoryPath = __basedir + "/project/"

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Couldn't download the file " + err,
      })
    }
  })
}

const createFile = (data, filename, repoId) => {
  const file = filename.split(".")

  data = JSON.stringify(data)
  /* const path =
    "/Users/bubz/Developer/master-project/local-file-transfer/uploads/" +
    file[0] +
    ".json" */

    const path = "/Users/bubz/Developer/master-project/aolme-backend/_fs/repository/"+repoId+"/ground-truth-reformat/"+file[0]+".json" 
  fs.writeFile(path, data, (err) => {
    if (err) {
      console.error(err)
    }
  })
}

module.exports = {
  upload,
  getListFiles,
  download,
  convertXlsx,
  doTest
}
