import {Router, Request, Response, NextFunction} from 'express';

const router: Router = Router()

interface RequestWithBody extends Request{
  body: {
    //keys og this obj are strings, value of that key is either a string or undefined
    [key: string]: string | undefined
  }
}
//Middleware
function isAuth (req: Request, res: Response, next: NextFunction): void{
  if(req.session && req.session.loggedIn){
    next();
    return;
  }
  res.status(403);
  res.send(`
  <h3>Not allowed</h3>
  <a href="/">Back to home page</a>
  `)
}

router.get('/', (req: Request, res: Response)=>{
  //check req.session
  if(req.session && req.session.loggedIn){
    res.send(`
    <div>
      <h3>Hello. You are logged in</h3>
      <div>
      <a href="/logout">Logout</a>
      </div>
    </div>
    `)
  }else{
    res.send(`
    <div>
      <h3>Hi. You are not logged in</h3>
      <div>
      <a href="/login">Login</a>
      </div>
    </div>
    `)
  }
  res.send("<h1>Hello from here</h1>")
})

router.get('/login', (req: Request, res: Response)=>{
  res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" type="email"/>
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password"/>
      </div>
      <button type="submit">Submit</button>
    </form>
  `)
})



router.get('/logout', (req: Request, res: Response)=>{
  req.session = undefined;
  res.redirect('/')
})
////////////
// protected routes
/////
router.get('/protected', isAuth,  (req: Request, res: Response)=>{
  res.send("Welcome to the team. This is a protected route")
})
export {router};