import express, {Response, Request} from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session'
import { AppRouter } from './AppRouter';
//login controller to be used in app
import './controllers/LoginController';


const app = express();
const port= process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieSession({ keys: ['akjdjldjlj'] }))

//Routes
app.use(router);
app.use(AppRouter.getInstance());

app.listen(port, ()=>{
  console.log(`server running on port ${port}`);
})