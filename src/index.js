import PatientModel from "./patientModel.js";
import PatientController from "./patientController.js";

jQuery(() => {
    const modelPatient = new PatientModel();
    const controller = new PatientController("#patient", modelPatient);
    controller.buildTable();
});





/* TESTANDO OS MÉTODOS */
/* 
console.log(modelPatient.patients);

modelPatient.add({
    name: "Samuel",
    email: "sm@gmail.com",
    phone: "78787878",
    cpf: "1261656616"
});

modelPatient.add({
    name: "Daniel",
    email: "sm@gmail.com",
    phone: "78787878",
    cpf: "1261656616"
});

modelPatient.add({
    name: "Raiza",
    email: "sm@gmail.com",
    phone: "78787878",
    cpf: "1261656616"
});

console.log(modelPatient.patients);
modelPatient.delete(1)

modelPatient.update(1, {
    name: "ATULALIZADO",
    email: "sm@ATULALIZADO.com",
    phone: "ATULALIZADO",
    cpf: "ATULALIZADO"
} )

console.log(modelPatient.patients); */

