import { Router } from 'express';

interface Route {
  basePath: string;
  router: Router;
}

export default Route;
