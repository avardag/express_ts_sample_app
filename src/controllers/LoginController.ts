import { Request, Response, NextFunction } from 'express';
import { get, controller } from './decorators'
import { use } from './decorators';

//sample MW
function logger(req:Request, res: Response, next: NextFunction) {
  console.log('request was made')
  next();
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
};