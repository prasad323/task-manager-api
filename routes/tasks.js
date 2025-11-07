const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controller/taskController');

const statusEnum = ['pending', 'in_progress', 'done'];



router.use(auth);

/**
 * POST /api/tasks
 */
router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').optional().trim(),
    body('status').optional().isIn(statusEnum).withMessage(`Status must be one of ${statusEnum.join(', ')}`),
    body('dueDate').optional().isISO8601().toDate().withMessage('dueDate must be a valid date')
  ],
  taskController.createTask
);

/**
 * GET /api/tasks
 */
router.get('/', taskController.getTasks);

/**
 * GET /api/tasks/:id
 */
router.get('/:id', taskController.getTaskById);

/**
 * PUT /api/tasks/:id
 */
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid id'),
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().trim(),
    body('status').optional().isIn(statusEnum).withMessage(`Status must be one of ${statusEnum.join(', ')}`),
    body('dueDate').optional().isISO8601().toDate().withMessage('dueDate must be a valid date')
  ],
  taskController.updateTask
);

router.delete('/:id', [param('id').isMongoId().withMessage('Invalid id')], taskController.deleteTask);

module.exports = router;
