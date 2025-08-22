
import { Router } from 'express';
import { GroupController } from './../controoler/group-controller';

 const groupRoutes = Router();

const groupController = new GroupController();

groupRoutes.get('/', groupController.listTable);

export {groupRoutes}

