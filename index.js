import inquirer from "inquirer";

const confirmAnswerValidator = async (input) => {
    if (input === '' || input === undefined || input === " ") {
       return 'Campos vazios, por favor preencha';
    }
    return true;
 };

 const confirmAnswerOnlyNumbers = async (input) => {
    if (!Number(input)) {
       return 'Preencha apenas com números, por favor';
    }
    return true;
 };

 const confirmValidatorTelephone = async (input) => {
    if (!input.match("([0-9]{2,3})?([0-9]{2})([0-9]{4,5})([0-9]{4})")) {
       return 'Por favor, digite corretamente seu número';
    }
    return true;
 };

inquirer.prompt([
    {
        name: "p1",
        message: "Boa noite, Somos da Pizzaria Silveira. Gostaria de fazer um pedido?",
        type: "rawlist",
        choices: ["Sim", "Não"]
    },
    {
        name: "p2",
        message: "Opções",
        type: "rawlist",
        choices: ["Cardápio"],
        when: res => res.p1 !== "Não"
    },
    {
        name: "p3",
        message: "Cardápio",
        type: "rawlist",
        choices: [`R$:${45} - Pizza 45cm`, `R$${35} - Pizza 30cm`, `R$${70} - Pizza trem 70cm`],
        when: res => res.p1 !== "Não"
    },
    {
        name: "p4",
        message: "Sabores",
        type: "rawlist",
        choices: ["Pepperoni", "Calabresa", "Portuguesa", "Nutella"],
        when: res => res.p1 !== "Não"
    },
    {
        name: "p5",
        message: "Bebidas?",
        type: "rawlist",
        choices: [`R$${6} - Coca Lata`,`R$${10} - Coca 2L`, "Nenhuma, Finalizar Pedido!"],
        when: res => res.p1 !== "Não"
    },
    {
        name: "p6",
        message: "É para retirar na Loja?",
        type: "confirm",
        when: res => res.p1 !== "Não"
    },
    {
        name: "p7",
        message: "Endereço",
        type: "input",
        when: res => res.p6 !== true && res.p1 !== "Não",
        validate: confirmAnswerValidator,
    },
    {
        name: "p8",
        message: "Telefone(Com DDD)",
        type: "input",
        when: res => res.p1 !== "Não",
        validate: confirmValidatorTelephone,
    },
    {
        name: "p9",
        message: "Forma de Pagamento",
        type: "rawlist",
        when: res => res.p1 !== "Não",
        choices: ["Cartão", "Dinheiro"],
    },
    {
        name: "p10",
        message: "Troco pra quanto?",
        type: "input",
        when: res => res.p1 !== "Não" &&  res.p9 !== "Cartão",
        validate: confirmAnswerOnlyNumbers,
    },
    {
        name: "p11",
        message: "Confirmação do Pedido",
        type: "confirm",
        when: res => res.p1 !== "Não",
    },
])
.then(res => {
    const isDelivery = `${res.p6 !== true ? `Seu pedido será enviado para: ${res.p7}, iremos lhe avisar por telefone quando estiver a caminho`: "O pedido será retirado no Estabelecimento, Iremos lhe avisar por Telefone quando estiver pronto"}, Muito obrigado!`
    const totalPrice = `${res.p9 === "Cartão" ? "" : "Troco para: R$"+res.p10}`
    const order = `Você pediu ${res.p3} - Sabor ${res.p4} ${res.p5 !== "Nenhuma, Finalizar Pedido!" ? res.p5 : ""}!
    \n${totalPrice} \n${isDelivery}`

    res.p11 !== true
    ? 
    console.log("Você cancelou seu pedido!") 
    : 
    console.log(order)
})
.catch(err =>{
    console.log(`Erro: ${err}`)
})