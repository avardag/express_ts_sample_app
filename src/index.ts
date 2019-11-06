import express, {Response, Request} from 'express';

const app = express();
const port= process.env.PORT || 3000;

app.get('/', (req: Request, res: Response)=>{
  res.send("<h1>Hello from here</h1>")
})


app.listen(port, ()=>{
  console.log(`server running on port ${port}`);
})