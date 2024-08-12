const Policy = require('../models/policy');

const validatePolicy = (policy) => {
    const { policy_number, insured_party, coverage_type, start_date, end_date, premium_amount, status } = policy;
    if (!policy_number || !insured_party || !coverage_type || !start_date || !end_date || !premium_amount || !status) {
        throw new Error('All fields are required');
    }
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const currentDate = new Date();

    if (startDate > endDate) {
        throw new Error('Start date cannot be later than end date');
    }

    if (endDate <= currentDate) {
        throw new Error('End date must be in the future');
    }
}

exports.fetchAll = async (req, res) => {
    try {
        const [policies] = await Policy.fetchAll();
        res.status(200).json(policies);
    } catch (err) {
        console.error('Error fetching policies:', err); // Log the error
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};

exports.getPolicyById = async (req, res) => {
    try {
        const policyId = req.params.policyId;
        const [policy] = await Policy.getPolicyById(policyId);
        if (policy.length === 0) {
            res.status(404).json({ error: 'Policy not found' });
            return;
        }
        res.status(200).json(policy[0]);
    } catch (err) {
        console.error('Error fetching policy:', err); // Log the error
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
}

exports.createPolicy = async (req, res) => {
    try {
        const policy = req.body;
        const validate = validatePolicy(policy);
        if (validate) {
            throw new Error(validate);
        }
        await Policy.createPolicy(policy);
        res.status(201).json({ message: 'Policy created successfully.' });
    } catch (err) {
        console.error('Error creating policy:', err); // Log the error
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
}

exports.updatePolicy = async (req, res) => {
    try {
        const policyDetails = req.body;
        const validation = validatePolicy(policyDetails);
        if(validation) {
            throw new Error(validation);
        }
        await Policy.updatePolicy(req.params.policyId, policyDetails);
        res.status(200).json({ message: 'Policy updated' });
    } catch (err) {
        console.error('Error updating policy:', err); // Log the error
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
}

exports.deletePolicy = async (req, res) => {
    try {
        await Policy.deletePolicy(req.params.policyId);
        res.status(200).json({ message: 'Policy deleted' });
    } catch (err) {
        console.error('Error deleting policy:', err); // Log the error
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
}
