import { Request, Response, NextFunction } from 'express';
import { get, post, controller, bodyValidator } from './decorators'
import { use } from './decorators';

//sample MW
function logger(req:Request, res: Response, next: NextFunction) {
  console.log('request was made')
  next();
}

interface RequestWithBody extends Request{
  body: {
    //keys og this obj are strings, value of that key is either a string or undefined
    [key: string]: string | undefined
  }
}

@controller('/auth')
export class LoginController{
  @get('/login')
  @use(logger)
  //route handler funcs
  getLogin(req: Request, res: Response): void{
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
  }
  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: RequestWithBody, res: Response):void{
    const {email, password} = req.body;
  
    //type guard
    if(email && password && email === 'alex@gmail.com' && password === '123'){
      //user logged in. save in session
      req.session = {
        loggedIn: true
      }
      // redirect to root route
      res.redirect('/')
    }else{
      res.send("You must provide an email and a password")
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response): void{
    req.session = undefined;
    res.redirect('/')
  }
}
