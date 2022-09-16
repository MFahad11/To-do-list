import Express from "express";
import todolist from "../Controllers/todoController.js";
import authUser from "../Middleware/authenticate.js";
const router=Express.Router();
router.use('/home',authUser)
router.use('/option',authUser)
router.use('/history',authUser)
router.get('/register',todolist.registerPage)
router.post('/register',todolist.createUser)
router.get('/login',todolist.loginPage)
router.post('/login',todolist.userLogin)
router.get('/home',todolist.home)
router.post('/home',todolist.insertTask)
router.get('/history',todolist.history)
router.post('/option',todolist.options)
export default router