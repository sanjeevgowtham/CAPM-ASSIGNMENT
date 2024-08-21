const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    const { Students } = this.entities;

    // Validation before CREATE operation
    this.before('CREATE', 'Students', (req) => {
        const { salaryAmount, Currency } = req.data;

        // Check if salaryAmount is less than 50000 and Currency is USD
        if (salaryAmount >= 50000 && Currency === 'USD') {
            req.error(400, 'Employee’s salary must be less than 50000 USD.');
        }
    });

    // After CREATE operation
    this.after('CREATE', 'Students', () => {
        console.log('Create operation successful');
    });

    // Validation before UPDATE operation
    this.before('UPDATE', 'Students', (req) => {
        const { salaryAmount, Currency, nameFirst, loginName } = req.data;

        // Check if salaryAmount is less than 50000 and Currency is USD
        if (salaryAmount >= 50000 && Currency === 'USD') {
            req.error(400, 'Employee’s salary must be less than 50000 USD.');
        }

        // Ensure nameFirst and loginName are not changed
        if (nameFirst !== undefined || loginName !== undefined) {
            req.error(400, 'Operation not allowed: nameFirst and loginName cannot be changed.');
        }
    });

    // After UPDATE operation
    this.after('UPDATE', 'Students', () => {
        console.log('Update operation successful');
    });

    // Validation before DELETE operation
    this.before('DELETE', 'Students', (req) => {
        const { nameFirst } = req.data;

        // Check if nameFirst starts with 'S'
        if (nameFirst && nameFirst.startsWith('S')) {
            req.error(400, "Operation not allowed: Cannot delete employees whose name starts with 'S'.");
        }
    });

    // After DELETE operation
    this.after('DELETE', 'Students', () => {
        console.log('Delete operation successful');
    });
});
