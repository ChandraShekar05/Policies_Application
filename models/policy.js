const db =  require('../config/db');

class Policy {
    static fetchAll() {
        return db.execute('SELECT * FROM policies');
    }

    static getPolicyById(policyId) {
        return db.execute('SELECT * FROM policies WHERE id = ?', [policyId]);
    }

    static createPolicy(policy) {
        const {policy_number, insured_party, coverage_type, start_date, end_date, premium_amount, status} = policy;
        if(!policy_number || !insured_party || !coverage_type || !start_date || !end_date || !premium_amount || !status) {
            throw new Error('All fields are required');
        }
        return db.execute('INSERT INTO policies (policy_number, insured_party, coverage_type, start_date, end_date, premium_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [policy_number, insured_party, coverage_type, start_date, end_date, premium_amount, status]
        );
    }

    static updatePolicy(policyId, policy) {
        const {policy_number, insured_party, coverage_type, start_date, end_date, premium_amount, status} = policy;

        if(!policy_number || !insured_party || !coverage_type || !start_date || !end_date || !premium_amount || !status) {
            throw new Error('All fields are required');
        }
        return db.execute('UPDATE policies SET policy_number = ?, insured_party = ?, coverage_type = ?, start_date = ?, end_date = ?, premium_amount = ?, status = ? WHERE id = ?', 
            [policy_number, insured_party, coverage_type, start_date, end_date, premium_amount, status, policyId]);
    }

    static deletePolicy(policyId) {
        return db.execute('DELETE FROM policies WHERE id = ?', [policyId]);
    }
}

module.exports = Policy;