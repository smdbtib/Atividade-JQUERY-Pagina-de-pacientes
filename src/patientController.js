export default class PatientController{

    editModal = new bootstrap.Modal(document.getElementById("edit-modal"));

    editToast = new bootstrap.Toast(document.getElementById("edit-toast"));

    constructor(selector, model){
        this.selector = selector;
        this.model = model;
        this.setUpForm();
        this.setUpAdd();
    }

    /* ADD PATIENT */
    setUpAdd(){
        $("#add-patient").submit((e) =>{
            e.preventDefault();
            const inputs = $("#add-patient").serializeArray(); // Transform em array de objetos
            const data = {};
            inputs.forEach((input) => {
                data[input.name] = input.value;
            });
            this.model.add(data); 
            $("#add-patient input").val("");
            this.buildTable();
        });
    }

    /* CONSTRUINDO A TABELA DE PACIENTES */
    buildTable(){
        $(this.selector).empty();
        this.model.patients.forEach((p) =>{
            $(this.selector).append
            (`
             <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.email}</td>
                <td>${p.phone}</td>
                <td>${p.cpf}</td>
                <td>
                    <button id="btn-edit-${p.id}" class="btn btn-warning btn-sm"><i class="bi bi-pencil"></i></button>
                    <button id="btn-del-${p.id}" class="btn btn-danger btn-sm"><i class="bi bi-trash"></i></button>
                </td>
             </tr>
            `)
            this.setUpUpdatePatiente(p);
            this.setUpDelete(p);
        });
    }

    /* EDITAR PATIENT NO MODAL */
    setUpUpdatePatiente(patient){
        $(`#btn-edit-${patient.id}`).click(() => { 
            $(`#id`).val(patient.id);
            $(`#editName`).val(patient.name);
            $(`#editEmail`).val(patient.email);
            $(`#editPhone`).val(patient.phone);
            $(`#editCpf`).val(patient.cpf);

            this.editModal.show();
        });

    }

    /* DELETE PATIENT */
    setUpDelete(patient){
        $(`#btn-del-${patient.id}`).click(() => { 
            this.model.delete(patient.id);
            this.buildTable();
        });
    }

    /* FORMATANDO OS CAMPOS DO FOMULÁRIO */
    setUpForm(){
        $("#phone, #editPhone").mask("(00) 00000-0000"); 
        $("#cpf, #editCpf").mask("000.000.000-00");

        $("#edit-patient").submit((e)=>{
            e.preventDefault();
            
            const inputs = $("#edit-patient").serializeArray(); // Transform em array de objetos            
            const id = Number(inputs[0].value)
            console.log(inputs);
            const data = {
                name: inputs[1].value,
                email: inputs[2].value,
                phone: inputs[3].value,
                cpf: inputs[4].value,
            };
            this.model.update(id, data);
            this.buildTable();
            this.editModal.hide();
            this.editToast.show({ outohide: true });

            $("#edit-patient input").val("");
        });
    }
}
