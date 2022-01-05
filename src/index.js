import PatientModel from "./patientModel.js";
import PatientController from "./patientController.js";

jQuery(() => {
    const modelPatient = new PatientModel();
    const controller = new PatientController("#patient", modelPatient);
    controller.buildTable();
});

