document.addEventListener('DOMContentLoaded', () => {
    const policyTableBody = document.querySelector('#policyTable tbody');
    const policyDetailsDiv = document.getElementById('policyDetails');

    // Regular expression for policy number
    const policyNumberRegex = /^PN\d{6}$/;

    // Fetch all policies and populate the table
    const fetchPolicies = async () => {
        try {
            const response = await fetch('/api/policies');
            const policies = await response.json();
            policyTableBody.innerHTML = '';
            policies.forEach(policy => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${policy.id}</td>
                    <td>${policy.policy_number}</td>
                    <td>${policy.insured_party}</td>
                    <td>${policy.coverage_type}</td>
                    <td>${policy.start_date}</td>
                    <td>${policy.end_date}</td>
                    <td>${policy.premium_amount}</td>
                    <td>${policy.status}</td>
                `;
                policyTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching policies:', error);
        }
    };

    // Validate policy number
    const validatePolicyNumber = (policyNumber) => {
        return policyNumberRegex.test(policyNumber);
    };

    // Validate Dates
    const validateDates = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        if (start > end) {
            alert('Start date cannot be greater than end date.');
            return false;
        }
        if (end <= today) {
            alert('End date must be in the future.');
            return false;
        }
        return true;
    };

    // Create a new policy
    document.getElementById('createPolicyForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const policyNumber = document.getElementById('policyNumber').value;
        const startDate = document.getElementById('policyStartDate').value;
        const endDate = document.getElementById('policyEndDate').value;
        if (!validatePolicyNumber(policyNumber)) {
            alert('Invalid policy number. It should be in the format PNxxxxxx where x is a digit.');
            return;
        }
        if (!validateDates(startDate, endDate)) {
            return;
        }
        const policy = {
            policy_number: policyNumber,
            insured_party: document.getElementById('insuredParty').value,
            coverage_type: document.getElementById('coverageType').value,
            start_date: startDate,
            end_date: endDate,
            premium_amount: document.getElementById('premiumAmount').value,
            status: document.getElementById('policyStatus').value
        };
        try {
            await fetch('/api/policies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(policy)
            });
            alert('Policy created successfully.');
            fetchPolicies();
        } catch (error) {
            console.error('Error creating policy:', error);
        }
        document.getElementById('createPolicyForm').reset();
    });

    // Update an existing policy
    document.getElementById('updatePolicyForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const policyId = document.getElementById('id').value;
        const policyNumber = document.getElementById('update_policyNumber').value;
        const startDate = document.getElementById('update_policyStartDate').value;
        const endDate = document.getElementById('update_policyEndDate').value;
        if (!validatePolicyNumber(policyNumber)) {
            alert('Invalid policy number. It should be in the format PNxxxxxx where x is a digit.');
            return;
        }
        if (!validateDates(startDate, endDate)) {
            return;
        }
        const policy = {
            policy_number: policyNumber,
            insured_party: document.getElementById('update_insuredParty').value,
            coverage_type: document.getElementById('update_coverageType').value,
            start_date: startDate,
            end_date: endDate,
            premium_amount: document.getElementById('update_premiumAmount').value,
            status: document.getElementById('update_policyStatus').value
        };
        try {
            await fetch(`/api/policies/${policyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(policy)
            });
            alert('Policy updated successfully');
            fetchPolicies();
        } catch (error) {
            console.error('Error updating policy:', error);
        }
        document.getElementById('updatePolicyForm').reset();
    });
    
    // Delete a policy
    document.getElementById('deletePolicyForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const policyId = document.getElementById('delete_id').value;
        try {
            await fetch(`/api/policies/${policyId}`, {
                method: 'DELETE'
            });
            alert('Policy deleted successfully');
            fetchPolicies();
        } catch (error) {
            console.error('Error deleting policy:', error);
        }
        document.getElementById('deletePolicyForm').reset();
    });

    // Get policy details by ID
    document.getElementById('getPolicyDetailsForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const policyId = document.getElementById('get_id').value;
        try {
            const response = await fetch(`/api/policies/${policyId}`);
            if (!response.ok) {
                alert('Invalid ID');
            }
            const policy = await response.json();
            if (!policy) {
                alert('Invalid ID');
            }
            policyDetailsDiv.innerHTML = `
                <p>Id: ${policy.id}</p>
                <p>Policy Number: ${policy.policy_number}</p>
                <p>Insured Party: ${policy.insured_party}</p>
                <p>Coverage Type: ${policy.coverage_type}</p>
                <p>Policy Start Date: ${policy.start_date}</p>
                <p>Policy End Date: ${policy.end_date}</p>
                <p>Premium Amount: ${policy.premium_amount}</p>
                <p>Policy Status: ${policy.status}</p>
            `;
        } catch (error) {
            console.error('Error fetching policy details:', error);
        }
        document.getElementById('getPolicyDetailsForm').reset();
    });


    // Initial fetch of all policies
    fetchPolicies();
});