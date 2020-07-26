let express = require('express');
let router = express.Router();
let formidable = require('formidable');
let fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/file',(req,res)=>{

  let path = `./${req.query.path}`
  if(fs.existsSync(path)){

    fs.readFile(path,(err,file)=>{
      if(err){
        console.log(err);
        res.status(404).json({err})
      }else{
        res.status(200).end(file)
      }


    });


  }else{
    res.status(404).json({error:'404 Not Found'})
  }

});

router.delete('/delete',(req,res)=>{

  let form = new formidable.IncomingForm({
    uploadDir:'./upload',
    keepExtensions:true
    
  });

  form.parse(req,(err,fields,files)=>{
    let path = `./${fields.path}`;

    if(fs.existsSync(path)){
      fs.unlink(path,(err)=>{
          if(err){
            console.log(err)
            res.status(400).json({err});
          }else{
            res.json(fields);
          }

        });
    }

  
  })

})

router.post('/upload', (req,res) =>{

  let form = new formidable.IncomingForm({
    uploadDir:'./upload',
    keepExtensions:true
    

  });

  form.parse(req,(err,fields,files)=>{
    res.json(files);
  })

  

});



module.exports = router;
