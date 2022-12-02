function requisition(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send();
    console.log(JSON.parse(xhttp.responseText));

    return JSON.parse(xhttp.responseText);
}

function post(url, obj) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, false);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(obj));
    console.log(JSON.parse(xhttp.responseText));

    return JSON.parse(xhttp.responseText);
}

function isLogged() {
    const user_id = window.sessionStorage.getItem('id');

    //icone login
    var login_icon = document.getElementById('icon-login');
    //icone carrinho
    var cart_icon = document.getElementById('link-cart');
    cart_icon.href = './login-registration.html';

    if (user_id) 
    {
        login_icon.innerHTML = '';
        cart_icon.href = '';

        return true;
    }

    else
    {
        return false;
    }
}

//limpar carrinho
var div_cart = document.getElementById('cart-list');
var div_CartSummary = document.getElementById('cart-summary');
div_cart.innerHTML = '';
div_CartSummary.innerHTML = '';

//receber todos os produtos
const products = requisition('http://localhost:3000/produtos')

//hash categorias
const categorys = new Map();
categorys.set('MOBO', 'Placas-Mães');
categorys.set('CPU', 'Processadores');
categorys.set('RAM', 'Memórias');
categorys.set('GAB', 'Gabinetes');
categorys.set('FON', 'Fontes');
categorys.set('SSD', 'Armazenamentos');
categorys.set('GPU', 'Placas de vídeo');

function sendNewUser() {

    //get data
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const cpf = document.getElementById('user-cpf').value;

    var user_register =
    {
        cli_nome: name,
        cli_email: email,
        cli_password: password,
        cli_cpfcnpj: cpf
    };

    const user = post('http://localhost:3000/clientes', user_register);

    if (!user.message) {
        alert('Usuário cadastrado');
    }

    else {
        alert(user.message)
    }

}

function login() {
    
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;

    var user_login =
    {
        cli_email: email,
        cli_password: password
    }

    const user = post('http://localhost:3000/clientes', user_login);

    if (user.id != 0) {
        window.sessionStorage.setItem('id', user.id)
        alert('Login efetuado com sucesso')
    }

    else {
        alert('Credenciais incorretas');
    }

}