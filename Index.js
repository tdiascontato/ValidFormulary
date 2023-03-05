class ValidaFormulario{
    constructor(){
        this.formulary = document.querySelector('.formulario');
        this.eventos();
    }
    eventos(){
        this.formulary.addEventListener('submit', e => this.handleSubmit(e));
    }
    handleSubmit(e){
        e.preventDefault();
        const campoValido = this.camposValidos();
        const senhaValida = this.senhasValidas();
        if(campoValido && senhaValida){
            alert('Formulário enviado!');
            this.formulary.submit();
        };
    };
    senhasValidas(){
        let valid = true;
        const senha = this.formulary.querySelector('.senha');
        const repetirSenha = this.formulary.querySelector('.repetir-senha');
        if(senha.value !== repetirSenha.value){
            valid = false;
            this.erro(senha, 'O campo SENHA precisa ser igual ao campo REPETIR SENHA');
            this.erro(repetirSenha, 'O campo SENHA precisa ser igual ao campo REPETIR SENHA');
        };
        if(senha.value.length> 12 || senha.value.length <6){
            valid = false;
            this.erro(senha, 'A senha precisa ter o tamanho entre 6 e 12 caracteres! ;)');
        };
        return valid;
    };
    camposValidos(){
        let valid = true;
        for(let erroText of this.formulary.querySelectorAll('.error-text')){
            erroText.remove();
        };
        for(let campo of this.formulary.querySelectorAll('.validar')){
            const label = campo.previousElementSibling.innerText;
            if(!campo.value){
            this.erro(campo,`${label} não pode estar vazio! ;)`)
            valid = false;
            };
        if(campo.classList.contains('cpf')){
            if(!this.validCPF(campo)) valid = false;
        }
        if(campo.classList.contains('usuario')){
            if(!this.validaUsuario(campo)) valid = false;
        }
        };
        return valid;
    };
    validaUsuario(campo){
        let valid = true;
        const usuario = campo.value;
        if(usuario.length<3 || usuario.length>12){
            this.erro(campo, 'O usuário precisa ter entre 3 e 12 caracteres! ;)');
            valid = false
        };
        if(!usuario.match(/^[a-zA-Z0-9]+$/g)){
            this.erro(campo, 'O usuário precisa conter apensas LETRAS e/ou NÚMEROS! ;)');
            valid = false
        };
        return valid;
    };
    validCPF(campo){
        //Não precisamos criar um valid aqui ;)
        const cpf = new ValidaCPF(campo.value);
        if(!cpf.valida()){
            this.erro(campo,'CPF inválido!');
            return false;
        }
        return true;
    };
    erro(campo, msg){
        const div = document.createElement('div');
        div.setAttribute('class','error-text');
        div.innerText = msg;
        campo.insertAdjacentElement('afterend',div);
    };
};
const FormularioNe = new ValidaFormulario();