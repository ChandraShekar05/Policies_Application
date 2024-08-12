const express = require('express');

const policyController = require('../controller/policyController');

const router = express.Router();

// Routes for fetching all the policies
router.get('/', policyController.fetchAll);

// Routes for fetching a policy based on Id
router.get('/:policyId', policyController.getPolicyById);

// Routes for creating a policy
router.post('/', policyController.createPolicy);

// Routes for updating a policy by it's Id
router.put('/:policyId', policyController.updatePolicy);

// Routes for deleting a policy by it's Id
router.delete('/:policyId', policyController.deletePolicy);

module.exports = router;