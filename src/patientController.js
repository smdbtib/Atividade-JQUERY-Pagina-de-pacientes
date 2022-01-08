export default class PatientController{

    editModal = new bootstrap.Modal(document.getElementById("edit-modal"));
    editToast = new bootstrap.Toast(document.getElementById("edit-toast"));
    deleteToast = new bootstrap.Toast(document.getElementById("delete-toast"));

    constructor(selector, model){
        this.selector = selector;
        this.model = model;
        this.setUpForm();
        this.setUpAdd();
        this.buildTable();
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
        if(this.model.patients.length > 0){
            $("#noPatiente").addClass("d-none")
            $("#tablePatient").removeClass("d-none")
        }else {
            $("#noPatiente").removeClass("d-none")
            $("#tablePatient").addClass("d-none")
        }
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
                <td>${p.cep}</td>
                <td>${p.rg}</td>
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
            $(`#editCep`).val(patient.cep);
            $(`#editRg`).val(patient.rg);

            this.editModal.show();
        });

    }

    /* DELETE PATIENT */
    setUpDelete(patient){
        $(`#btn-del-${patient.id}`).click(() => { 
            //(FEATURE) Confirmação de deleção método confirm().
            if( confirm(`Do you want to confirm patient deletion?`)){
                this.model.delete(patient.id);
                this.buildTable();
                this.deleteToast.show({ outohide: true });
            }  
        });
    }

    /* FORMATANDO OS CAMPOS DO FOMULÁRIO */
    setUpForm(){
        $("#phone, #editPhone").mask("(00) 00000-0000"); 
        $("#cpf, #editCpf").mask("000.000.000-00");
        //(FIXES) Máscaras para os campos de CEP E RG.
        $("#cep, #editCep").mask("00000-000");
        $("#rg, #editRg").mask("0.000.000");

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
                cep: inputs[5].value,
                rg: inputs[6].value,
            };
            this.model.update(id, data);
            this.buildTable();
            this.editModal.hide();
            this.editToast.show({ outohide: true });

            $("#edit-patient input").val("");
        });
    }
}
