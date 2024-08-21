using { ust.sanjeev.karanam.db.master } from '../db/Datamodel';

service EmployeeService @(path: 'EmployeeService') {
    entity EmployeeSet as projection on master.employees;
}


