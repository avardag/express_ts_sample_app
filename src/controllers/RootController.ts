import { Request, Response, NextFunction } from 'express'
import {get, use, controller} from './decorators'

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

@controller('')
export class RootController{
  @get('/')
  getRoot(req: Request, res: Response) {
    //check req.session
    if(req.session && req.session.loggedIn){
      res.send(`
      <div>
        <h3>Hello. You are logged in</h3>
        <div>
        <a href="/auth/logout">Logout</a>
        </div>
      </div>
      `)
    }else{
      res.send(`
      <div>
        <h3>Hi. You are not logged in</h3>
        <div>
        <a href="/auth/login">Login</a>
        </div>
      </div>
      `)
    }
    res.send("<h1>Hello from here</h1>")
  }
  
  ////////////
  // protected routes
  /////
  @get('/protected')
  @use(isAuth)
  getProtected(req: Request, res: Response){
    res.send("Welcome to the team. This is a protected route")
  }
}