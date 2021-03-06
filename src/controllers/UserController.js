//importando o model User
const User = require('../models/User');

//controller do model User
module.exports = {
    //método que armazena um  registro no banco de dados
    //INSERT INTO nomeDaTabela VALUES ...
    async store(req, res){  
        const { name, email } = req.body;

        const user = await User.create({name, email}); //o async/await representa que a função é assincrona 
        return res.json(user);
    },
    //método que lista todos os registros
    //SELECT * FROM nomeDaTabela
    async index(req, res){
        const users = await User.findAll();

        return res.json(users);
    },
    //método que mostra um registro em específico
    //SELECT * FROM WHERE id = ...
    async show(req, res){
        const user = await User.findByPk(req.params.id);

        return res.json(user);
    },
    //metódo que atualiza um registro em específico
    //UPDATE nomeDaTabela SET nomeDaColuna = value WHERE id = ...
    async update(req, res){
        const user = await User.findByPk(req.params.id);
        const { name, email} = req.body;

        await user.update({name, email});
        return res.json(user);
    },
    //metódo que exclui um registro
    //DELETE FROM nomeDaTabela WHERE id = ...
    async destroy(req, res){
        const user = await User.findByPk(req.params.id);

        try{
            await user.destroy();
            return res.json({"mensagem": "User excluído com sucesso."});
        }catch(err){
            return res.json({"mensagem": "Erro ao excluir usuário."});
        }
        
    }
};