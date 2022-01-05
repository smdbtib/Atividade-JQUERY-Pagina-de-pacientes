export default class PatientModel{
    patients = [];
    currentId = 1;
    /* Add patient */
    add(data){
        this.patients.push({
            /* Desestrurando o objeto ...data para passar os valores */
            ...data,
            id: this.currentId, 
        });
        this.currentId++;
    }
    /* Upadate patient */
    update(id, data){
        const patientIndex = this.patients.findIndex((p) => p.id === id);

        if(patientIndex > -1){
            this.patients[patientIndex] = {...data, id};
        }
    }
    /* Delete patient */
    delete(id){
        this.patients = this.patients.filter((p)=> p.id !== id)
    }
}