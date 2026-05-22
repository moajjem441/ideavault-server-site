const express = require('express')
const cors = require('cors');
const dotenv = require("dotenv")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { createRemoteJWKSet, jwtVerify } = require('jose-cjs');
dotenv.config()
const uri =process.env.MONGO_URL;

const app = express()
const port =process.env.PORT

app.use(cors());
app.use(express.json());


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


//---varify token by middleware--------

// const JWKS = createRemoteJWKSet(
//   new URL("http://localhost:3000/api/auth/jwks")
// )


// const verifyToken =async (req,res,next)=>{
//   const authHeader=req?.headers.authorization
//   if(!authHeader){
//     return res.status(401).json({message:"Unauthorized"})
//   }
//   const token = authHeader.split(" ")[1]

//   if(!token){
//     return res.status(401).json({message:"Unauthorized"})
//   }
//   console.log(token)



//   try{
//     const {payload}=await jwtVerify(token,JWKS)

//   console.log(payload)

//    next()
//   }catch(error){
//     return res.status(403).json({message:
//       "Forbidden"
//     });
//   }
 
// }



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
  await client.connect();

   const db = client.db('ideaVault'); 
    const trendingCollection = db.collection("trendingIdea");
    const commentCollection =db.collection("comments");

    app.get('/all-comments',async(req,res)=>{
      const allComments= await commentCollection.find().toArray()
      res.json(allComments)
    })




     //--------<>Search<>---------

app.get('/ideas', async (req, res) => {

  const {search,start,end}=req.query;

  let query = {};

  if (search) {
    query.$or=[
      {
      title: {
        $regex: search,
        $options: 'i',
      },
    },
    { 
    category:{
        $regex: search,
        $options:'i',
      },
     
    },
    ] ;
  }

  if(start || end){
    query.createdAt = {}
    if(start) query.createdAt.$gte = new Date(start);
    if(end) query.createdAt.$lte= new Date(end);
  }

  // console.log(query);

  const result = await trendingCollection.find(query).toArray();

  res.send(result);
});







    //trending data get
    // verifyToken,
    app.get('/trendingIdea',async(req,res)=>{
        // const trending =await trendingData.aggregate([{$limit:6}]).toArray()
        const trending = await trendingCollection.find().limit(6).toArray()

        res.json(trending)
    })

    //trending data details
    app.get('/trendingIdea/:id',async(req,res)=>{
        const {id}=req.params
        const trendingDeatils= await trendingCollection.findOne({_id: new ObjectId(id)})
        res.json(trendingDeatils)
    })


    //all ideas api
    app.get('/ideas',async(req,res)=>{
      const ideasData = await trendingCollection.find().toArray();
      res.json(ideasData)
    })

    //add idea
    app.post('/trendingIdea',async(req,res)=>{
      const addedData=req.body
      const result = await trendingCollection.insertOne(addedData)
      res.json(result)
    })


    //my idea 
    app.get('/my-ideas/:email',async(req,res)=>{
       const {email}=req.params

       const myIdeas= await trendingCollection.find({email: email}).toArray()
       res.json(myIdeas)
    })



  //my idea data

    app.get('/my-ideas/:email/:id',async(req,res)=>{
      const {email,id}=req.params
      // const updateData = body

      const myideasdetails= await trendingCollection.findOne({email:email,_id:new ObjectId(id)})
      res.json(myideasdetails)
    })




    //my idea details

    app.patch('/my-ideas/:email/:id',async(req,res)=>{
      const {email,id}=req.params
      const updateData = req.body

      const myideasdetails= await trendingCollection.updateOne({email:email,_id:new ObjectId(id)},{$set:updateData})
      res.json(myideasdetails)
    })


    //my idea delete

 app.delete('/my-ideas/:email/:id',async(req,res)=>{
  const {email,id}=req.params

  const deleteIdea= await trendingCollection.deleteOne({email:email,_id:new ObjectId(id)})
  res.json(deleteIdea)
 })













  
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
