const Memo = require('../models/MemoModels')
const router = require('express').Router()
const User = require('../models/User')
const multer  = require('multer');
const { verifyJWT } = require('../config/isAuthenticated');

const storage = multer.diskStorage({
    destination:(req,file,callback) =>{
        callback(null, './client/public/uploads/');
    },
    filename:(req,file,callback) => {
        callback(null,file.originalname);
    }
})

const upload = multer({storage:storage})


router.get('/', async(req,res) => {
    try {
        await Memo.find({}).then(memo => {
            res.json(memo)
        })
        .catch(err => {
            res.json({error: true})
        })

    } catch(error) {
        res.json("Error incurred")
    }
})



router.get('/:id', async(req,res) => {
    try {
        await Memo.findById(req.params.id).then(memo => {
            res.json(memo)
        })
        .catch(err => {
            res.json("Error "+ err)
        })

    } catch(error) {
        res.json("Error incurred")
    }
})

router.post("/add",verifyJWT,upload.single("memoImage"), async(req,res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const Image = req.file.originalname
        const newMemo = new Memo()
        newMemo.author = req.Username;
        newMemo.authorId = req.userId
        console.log(req.userId)
        newMemo.title = title;
        newMemo.Description = description;
        newMemo.Image = Image;
       await newMemo.save().then((doc) => {
           res.json(doc)
       }).catch(err => {
           res.json({Error: "Error in database "+ err})
       })

    } catch (error){
        res.json("Error : " + error)
    }
})

router.get('/mypost/:id',verifyJWT, async(req,res) => {
    try {
        await Memo.find({authorId:req.params.id}).then(memo => {
            if(!memo || memo === null ) {
                res.json({error:false, message:"files not available"})
 
            }
            res.json(memo)
        })
        .catch(err => {
            res.json({error: true})
        })

    } catch(error) {
        res.json("Error incurred")
    }
})
router.put("/update/:id",verifyJWT ,upload.single("memoImage"),async(req,res) => {

        const title = req.body.title;
        const description = req.body.description;
        const Image = req.file.originalname

    try {

        Memo.findByIdAndUpdate(req.params.id).then(async(memo) => {
            
            memo.title = title;
            memo.Description = description;
            memo.Image = Image

           await memo.save().then((doc) => {
               res.json({message:"Document is updated", doc:doc})
           }).catch(err => {
               res.json({Error: "Error in database "+ err})
           })
        }).catch(err => {
            res.json("Error in updating")
        })          

    } catch (error){
        res.json("Error : " + error)
    }
})

router.delete("/:id/delete",verifyJWT ,(req,res) => {
    Memo.findByIdAndDelete(req.params.id).then(() => {
        res.json("File is deleted")
    }).catch(err => {
        res.json("Error in deleting")
    })
})

module.exports = router