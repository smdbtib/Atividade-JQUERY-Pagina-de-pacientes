export default class PatientModel{
    /* (FEATURE) Salve o vetor de pacientes no LocalStorage.*/
    patients = JSON.parse(localStorage.getItem("db_patient")) ?? [] ; //JSON.parse 
    currentId = 0;
    /* Add patient */
    add(data){
        this.patients.push({
            ...data,
            id: this.currentId, 
        });
        localStorage.setItem("db_patient", JSON.stringify(this.patients )); // JSON.stringify
        this.currentId++;
    }
    /* Upadate patient */  
    update(id, data){
        this.patients[id] = {id, ...data};
        localStorage.setItem("db_patient", JSON.stringify(this.patients)); // JSON.stringify
    }
    /* Delete patient */
    delete(id){
        const patientIndex = this.patients.findIndex((p) => p.id === id);
        this.patients.splice(patientIndex,1)
        localStorage.setItem("db_patient", JSON.stringify(this.patients)); // JSON.stringify
    }
}
