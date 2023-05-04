import { Application, NextFunction } from 'express';
export abstract class CommonRoutesConfig {
  app: Application;
  name: string;
  constructor(app: Application, name: string) {
    this.app = app;
    this.name = name;
    this.configure();
  }
  getName(): string {
    return this.name;
  }
  runAsyncWrapper(callback: Function) {
    return function (req: Request, res: Response, next: NextFunction) {
      callback(req, res, next).catch(next);
    };
  }
  abstract configure(): Application;
}
