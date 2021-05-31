// Setting up the models

const Recipe = require('../models/recipe.model')
const Step = require('../models/step.model');
const Ingredient = require('../models/ingredient.model');
const User = require('../models/user.model');

// Setting up db
const mongoose = require('mongoose');



async function seedDB() {
    try {
        var url = "mongodb://127.0.0.1:27017/tagme";
        await mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true});
        let conn = mongoose.connection;
        console.log("connected correctly to server");

        // ----------------------------
        // Apagando o Banco de Dados
        // ----------------------------
        console.log("Starting to clean the db...")
        await mongoose.connection.dropDatabase();
        console.log("Done")

        // ----------------------------
        // Criando as receitas
        // ----------------------------
        console.log("Creating the recipes...")


        // Primeira receita
        let arrozDeMariscos = {
            name: "Arroz de Mariscos para 2 pessoas",
            description: "Arroz com camarão, lula, peixe, lagosta, e mexilhão, refogado com pimentões e cebola juliene, temperos e um leve toque de açafrão. Servidos na paellera. Rico em sabor e apresentação.",
            duration: "25 minutos"
        };
        conn.collection('recipes').insertOne(arrozDeMariscos);
        arrozDeMariscos = await Recipe.find({ name: "Arroz de Mariscos para 2 pessoas" }).lean();

        // Segunda receita
        let moquecaTropical = {
            name: "Moqueca Tropical",
            description: "Escolha entre Camarão ou Peixe ou a combinação dos dois | De origem indígena. A moqueca é um cozido de peixe ou camarão ou com mistura de peixe e camarão com tomate, cebola, pimentões e cheiro-verde refogados. Leve toque de azeite de dendê e leite de coco natural. Na versão tropical, acrescentamos manga e abacaxi. Acompanha arroz branco, pirão de camarão e farofa de dendê",
            duration: "40 minutos"
        };
        conn.collection('recipes').insertOne(moquecaTropical);
        moquecaTropical = await Recipe.find({ name: "Moqueca Tropical" }).lean();


        // Terceira receita
        let frutosDoMarAoAzeiteDeErvas = {
            name: "Frutos do Mar ao Azeite de Ervas",
            description: "Para apreciadores de frutos do mar, com leve aroma de azeite de ervas finas. Mexilhões, polvo, peixe, camarão e lula salteados com azeite, champignon, cebola picada,pimentão, alho, alcaparras e brócolis. Servidos com arroz de brócolis e legumes salteados",
            duration: "30 minutos"
        };
        conn.collection('recipes').insertOne(frutosDoMarAoAzeiteDeErvas);
        frutosDoMarAoAzeiteDeErvas = await Recipe.find({ name: "Frutos do Mar ao Azeite de Ervas" }).lean();

        // Quarta receita
        let massaEspagueteAItaliana = {
            name: "Massa espaguete à Italiana",
            description: "Espaguete italiano coberto com mexilhões, lula, polvo, camarões, salteados no azeite com alho, cebola, molho de tomates frescos e manjericão.",
            duration: "18 minutos"
        };
        conn.collection('recipes').insertOne(massaEspagueteAItaliana);
        massaEspagueteAItaliana = await Recipe.find({ name: "Massa espaguete à Italiana" }).lean();

        // Quinta receita
        let boboDeLagosta = {
            name: "Bobó de Lagosta",
            description: "De origem indígena com toques cearenses. Esta moqueca de lagosta é feita com verduras refogadas acrescidas de leite de coco, azeite de dendê e coentro. Acompanha arroz branco, pirão de camarão e farofa de dendê",
            duration: "50 minutos"
        };
        conn.collection('recipes').insertOne(boboDeLagosta);
        boboDeLagosta = await Recipe.find({ name: "Bobó de Lagosta" }).lean();

        console.log("Done")
        

        
        // Criando os passos e associando às receitas
        console.log("Creating steps and Adding to the recipes...")
        
        // ---------------------------------------------------------
        // Steps da primeira Receita
        // ---------------------------------------------------------
        const firstRecipeSteps = [
            { number: 1, description: "Faça um refogado com o azeite a cebola e os dentes de alho bem picados. Esmague os tomates maduros sem pele e junte ao refogado. Tempere com sal. Deixe 'namorar' durante alguns minutos.", recipe: arrozDeMariscos.map(record => record._id)},
            { number: 2, description: "Deixe a descongelar a embalagem de cocktail de marisco e delícias do mar, retire-as também do congelador e ponha-as de parte.", recipe: arrozDeMariscos.map(record => record._id)},
            { number: 3, description: "Junte os mariscos (as delícias ficam para mais tarde) ao refogado e mexa. Com o lume brando, tape o tacho e deixe 'namorar' durante 15 minutos. ", recipe: arrozDeMariscos.map(record => record._id)},
            { number: 4, description: "Junte água a tapar esta mistura e assim que ferver deite o arroz e mexa. Quando retomar a fervura, deixe cozer tapado durante 10 minutos, vá mexendo para não pegar.", recipe: arrozDeMariscos.map(record => record._id)},
            { number: 5, description: "Apague o lume, junte as delícias cortadas em cubinhos e polvilhe com coentros picados. Sirva de seguida.", recipe: arrozDeMariscos.map(record => record._id)},
            { number: 6, description: "Depois temos o Arroz de Marisco Tradicional que leva todo o tipo marisco, desde sapateira, lagosta, mexilhões e etc", recipe: arrozDeMariscos.map(record => record._id)}
        ]

        
        conn.collection("steps").insertMany(firstRecipeSteps, function (err, r) {
            if (err) throw err;
        })
        
        
        // Creating the relationship between steps and the recipe
        const receitaUm = await Recipe.findOne({ name: "Arroz de Mariscos para 2 pessoas"})
        const receitaUmPassos = await Step.find({recipe: receitaUm});
        receitaUmPassos.forEach(step => {
            receitaUm.steps.push(step);
        })
        receitaUm.save();
        
        
        // ---------------------------------------------------------
        // Steps da segunda Receita
        // ---------------------------------------------------------
        const secondRecipeSteps = [
            { number: 1, description: "Prepare o caldo de peixe com as espinhas e cabeça.", recipe: moquecaTropical.map(record => record._id)},
            { number: 2, description: "Acrescente cebola, pimentão, tomate, alho, sal e pimenta ao caldo até apurar", recipe: moquecaTropical.map(record => record._id)},
            { number: 3, description: "Coloque as bananas por baixo da terrine, intercale com o molho e o peixe.", recipe: moquecaTropical.map(record => record._id)},
            { number: 4, description: "Tempere com sal e pimenta.", recipe: moquecaTropical.map(record => record._id)},
            { number: 5, description: "Cubra com o molho já com o camarão.", recipe: moquecaTropical.map(record => record._id)},
            { number: 6, description: "Leve ao forno por 20 minutos.", recipe: moquecaTropical.map(record => record._id)}
        ]
        
        
        conn.collection("steps").insertMany(secondRecipeSteps, function (err, r) {
            if (err) throw err;
        })
        
        
        // Creating the relationship between steps and the recipe
        const receitaDois = await Recipe.findOne({ name: "Moqueca Tropical"})
        const receitaDoisPassos = await Step.find({recipe: receitaDois});
        receitaDoisPassos.forEach(step => {
            receitaDois.steps.push(step);
        })
        receitaDois.save();
        
        
        // ---------------------------------------------------------
        // Steps da Terceira Receita
        // ---------------------------------------------------------
        const thirdRecipeSteps = [
            { number: 1, description: "Junte todas as ervas e pique muito bem com a faca. Some a 150 ml de azeite e deixe", recipe: frutosDoMarAoAzeiteDeErvas.map(record => record._id)},
            { number: 2, description: "Limpe as lulas, descartando as nadadeiras e a pele, e guardando os corpos e as cabeças.", recipe: frutosDoMarAoAzeiteDeErvas.map(record => record._id)},
            { number: 3, description: "Encha de água uma panela grande e leve ao fogo alto até ferver.", recipe: frutosDoMarAoAzeiteDeErvas.map(record => record._id)},
            { number: 4, description: "Junte água a tapar esta mistura e assim que ferver deite o arroz e mexa.\n Quando retomar a fervura, deixe cozer tapado durante 10 minutos, vá mexendo para não pegar.", recipe: frutosDoMarAoAzeiteDeErvas.map(record => record._id)},
            { number: 5, description: "Apague o lume, junte as delícias cortadas em cubinhos e polvilhe com coentros picados. Sirva de seguida.", recipe: frutosDoMarAoAzeiteDeErvas.map(record => record._id)},
            { number: 6, description: "Selar os camarões, repita o processo com a lula e acabou!", recipe: frutosDoMarAoAzeiteDeErvas.map(record => record._id)}
        ]
        
        
        conn.collection("steps").insertMany(thirdRecipeSteps, function (err, r) {
            if (err) throw err;
        })
        
        
        // Creating the relationship between steps and the recipe
        const receitaTres = await Recipe.findOne({ name: "Frutos do Mar ao Azeite de Ervas"})
        const receitaTresPassos = await Step.find({recipe: receitaTres});
        receitaTresPassos.forEach(step => {
            receitaTres.steps.push(step);
        })
        receitaTres.save();
        
        
        // ---------------------------------------------------------
        // Steps da Quarta Receita
        // ---------------------------------------------------------
        const fourthRecipeSteps = [
            { number: 1, description: "Cozinhe o macarrão em água fervente e sal, até que fique al dente.", recipe: massaEspagueteAItaliana.map(record => record._id)},
            { number: 2, description: "Enquanto isso, em uma panela, aqueça o azeite, adicione os tomates, os sticks e refogue ligeiramente", recipe: massaEspagueteAItaliana.map(record => record._id)},
            { number: 3, description: "Junte o manjericão e misture.", recipe: massaEspagueteAItaliana.map(record => record._id)},
            { number: 4, description: "Escorra o macarrão, coloque em um recipiente e adicione o refogado de tomates.", recipe: massaEspagueteAItaliana.map(record => record._id)},
            { number: 5, description: "Apague o lume, junte as delícias cortadas em cubinhos e polvilhe com coentros picados. Sirva de seguida.", recipe: massaEspagueteAItaliana.map(record => record._id)},
            { number: 6, description: "Polvilhe o queijo ralado e sirva a seguir.", recipe: massaEspagueteAItaliana.map(record => record._id)}
        ]
        
        
        conn.collection("steps").insertMany(fourthRecipeSteps, function (err, r) {
            if (err) throw err;
        })
        
        
        // Creating the relationship between steps and the recipe
        const receitaQuatro = await Recipe.findOne({ name: "Massa espaguete à Italiana"})
        const receitaQuatroPassos = await Step.find({recipe: receitaQuatro});
        receitaQuatroPassos.forEach(step => {
            receitaQuatro.steps.push(step);
        })
        receitaQuatro.save();
        
        // ---------------------------------------------------------
        // Steps da Quinta Receita
        // ---------------------------------------------------------
        const fifthRecipeSteps = [
            { number: 1, description: "Lave os camarões e tempere com sal, alho, pimenta e limão, deixe marinar.", recipe: boboDeLagosta.map(record => record._id)},
            { number: 2, description: "Pegue uma panela com água e cozinhe a mandioca em pedacinhos, com louro e a cebola em rodelas.\nQuando estiver mole, acrescente um vidro de leite de coco", recipe: boboDeLagosta.map(record => record._id)},
            { number: 3, description: "Deixe esfriar um pouco e bata no liquidificador.\nEsquente o azeite de oliva, junte a cebola ralada e deixe dourar.", recipe: boboDeLagosta.map(record => record._id)},
            { number: 4, description: "Esquente o azeite de oliva, junte a cebola ralada e deixe dourar..", recipe: boboDeLagosta.map(record => record._id)},
            { number: 5, description: "Adicione as 2 latas de pomarola, o cheiro-verde, o pimentão e deixe cozinhar por alguns minutos.", recipe: boboDeLagosta.map(record => record._id)},
            { number: 6, description: "Junte na mesma panela, a mandioca batida no liquidificador, outro vidro de leite de coco e o azeite de dendê. Deixe levantar fervura e está pronto.", recipe: boboDeLagosta.map(record => record._id)}
        ]
        
        
        conn.collection("steps").insertMany(fifthRecipeSteps, function (err, r) {
            if (err) throw err;
        })
        
        
        // Creating the relationship between steps and the recipe
        const receitaCinco = await Recipe.findOne({ name: "Bobó de Lagosta"})
        const receitaCincoPassos = await Step.find({recipe: receitaCinco});
        receitaCincoPassos.forEach(step => {
            receitaCinco.steps.push(step);
        })
        receitaCinco.save();
        console.log("Done");


        // ----------------------------
        // Criando os Chefs
        // ----------------------------
        console.log("Creating the Chefs...")
        const users = [
            { name: "Chef Fogaça", email: "fogaca@cocobambu.com", password: "12345678" },
            { name: "Chef Jaquin", email: "jaquin@cocobambu.com", password: "12345678" },
            { name: "Chef Paola", email: "paola@cocobambu.com", password: "12345678" }
        ];
        conn.collection("users").insertMany(users, function (err, r) {
            if (err) throw err;
            console.log("Chefs created:")
            console.log(r.ops)
        })

        console.log("Done")
        
        
        // Creating the ingredients and their relationship with recipes
        console.log("Adding the ingredients to the recipes...")
        
        // ---------------------------------------------------------
        // Ingredients da Primeira Receita
        // ---------------------------------------------------------
        
        const firstRecipeIngredients = [
            { name: "1 cebola", recipe: arrozDeMariscos.map(record => record._id) },
            { name: "2 dentes de alho", recipe: arrozDeMariscos.map(record => record._id) },
            { name: "3 colheres de sopa de Azeite", recipe: arrozDeMariscos.map(record => record._id) },
            { name: "4 tomates", recipe: arrozDeMariscos.map(record => record._id) },
            { name: "2 Pitadas de Sal", recipe: arrozDeMariscos.map(record => record._id) },
            { name: "1 embalagem de marisco (mistura)", recipe: arrozDeMariscos.map(record => record._id) },
            { name: "1 embalagem de camarão inteiro congelado", recipe: arrozDeMariscos.map(record => record._id) },
            { name: "1 chávena de arroz", recipe: arrozDeMariscos.map(record => record._id) },
            { name: "1 porção de coentros", recipe: arrozDeMariscos.map(record => record._id) }
        ]
        
        conn.collection("ingredients").insertMany(firstRecipeIngredients, async function (err, r) {
            if (err) throw err;
            // Object.values(r.insertedIds).forEach(ingredient =>))
            const receitaUmIngredientes = await Ingredient.find({recipe: receitaUm});
            receitaUmIngredientes.forEach(ingredient => {
                receitaUm.ingredients.push(ingredient);
            });
            receitaUm.save();
        });


        

        // Creating the relationship between steps and the recipe
        
               
        // ---------------------------------------------------------
        // Ingredients da Segunda Receita
        // ---------------------------------------------------------
        
        const secondRecipeIngredients = [
            { name: "2 kg de robalo cortado em postas com couro", recipe: moquecaTropical.map(record => record._id)},
            { name: "4 cebolas grandes", recipe: moquecaTropical.map(record => record._id)},
            { name: "1 cabeça de alho", recipe: moquecaTropical.map(record => record._id)},
            { name: "4 tomates grandes", recipe: moquecaTropical.map(record => record._id)},
            { name: "Farinha de mandioca", recipe: moquecaTropical.map(record => record._id)},
            { name: "100ml de azeite de dendê", recipe: moquecaTropical.map(record => record._id)},
            { name: "Pimenta do reino a gosto", recipe: moquecaTropical.map(record => record._id)},
            { name: "Espinhas e cabeça do robalo", recipe: moquecaTropical.map(record => record._id)},
            { name: "4 bananas em fatias", recipe: moquecaTropical.map(record => record._id)},
            { name: "1kg de camarão descascado", recipe: moquecaTropical.map(record => record._id)},
            { name: "Sal (à gosto)", recipe: moquecaTropical.map(record => record._id)}
        ]
        
        conn.collection("ingredients").insertMany(secondRecipeIngredients, async function(err, r) {
            if (err) throw err;
            // Creating the relationship between steps and the recipe
            const receitaDoisIngredientes = await Ingredient.find({recipe: receitaDois});
            receitaDoisIngredientes.forEach(ingredient => {
                receitaDois.ingredients.push(ingredient);
            });
            receitaDois.save();
        });
        
        
        // ---------------------------------------------------------
        // Ingredients da Terceira Receita
        // ---------------------------------------------------------
        
        const thirdRecipeIngredients = [
            { name: "250 gr fettuccine", recipe: frutosDoMarAoAzeiteDeErvas.map(record => record._id)},
            { name: "250 gr lula", recipe: frutosDoMarAoAzeiteDeErvas.map(record => record._id)},
            { name: "6 unidades de vieira", recipe: frutosDoMarAoAzeiteDeErvas.map(record => record._id)},
            { name: "6 unidades de camarão rosa ", recipe: frutosDoMarAoAzeiteDeErvas.map(record => record._id)},
            { name: "60 gr vôngole ", recipe: frutosDoMarAoAzeiteDeErvas.map(record => record._id)},
            { name: "100 gr tomate cereja ", recipe: frutosDoMarAoAzeiteDeErvas.map(record => record._id)},
            { name: "100 gr mini-abobrinha ", recipe: frutosDoMarAoAzeiteDeErvas.map(record => record._id)},
            { name: "200 ml azeite de oliva alecrim a gosto ", recipe: frutosDoMarAoAzeiteDeErvas.map(record => record._id)},
            { name: "1 maço de tomilho ", recipe: frutosDoMarAoAzeiteDeErvas.map(record => record._id)},
            { name: "1 maço de manjericão ", recipe: frutosDoMarAoAzeiteDeErvas.map(record => record._id)},
            { name: "30 gr manteiga ", recipe: frutosDoMarAoAzeiteDeErvas.map(record => record._id)}
        ]
        
        conn.collection("ingredients").insertMany(thirdRecipeIngredients, async function(err, r) {
            if (err) throw err;
            // Creating the relationship between steps and the recipe
            const receitaTresIngredientes = await Ingredient.find({recipe: receitaTres});
            receitaTresIngredientes.forEach(ingredient => {
                receitaTres.ingredients.push(ingredient);
            });
            receitaTres.save();
        });
        
        
        
        // ---------------------------------------------------------
        // Ingredients da Quarta Receita
        // ---------------------------------------------------------
        
        const fourthRecipeIngredients = [
            { name: "200 gr Espaguete", recipe: massaEspagueteAItaliana.map(record => record._id)},
            { name: "6 unidades de vieira ", recipe: massaEspagueteAItaliana.map(record => record._id)},
            { name: "6 unidades de camarão rosa ", recipe: massaEspagueteAItaliana.map(record => record._id)},
            { name: "60 gr vôngole ", recipe: massaEspagueteAItaliana.map(record => record._id)},
            { name: "300 gr tomate cereja ", recipe: massaEspagueteAItaliana.map(record => record._id)},
            { name: "200 ml azeite de oliva alecrim a gosto ", recipe: massaEspagueteAItaliana.map(record => record._id)},
            { name: "1 maço de tomilho ", recipe: massaEspagueteAItaliana.map(record => record._id)},
            { name: "30 gr manteiga ", recipe: massaEspagueteAItaliana.map(record => record._id)},
        ]
        
        conn.collection("ingredients").insertMany(fourthRecipeIngredients, async function(err, r) {
            if (err) throw err;
            // Creating the relationship between steps and the recipe
            const receitaQuatroIngredientes = await Ingredient.find({recipe: receitaQuatro});
            receitaQuatroIngredientes.forEach(ingredient => {
                receitaQuatro.ingredients.push(ingredient);
            });
            receitaQuatro.save();
        });
        
        
        
        // ---------------------------------------------------------
        // Ingredients da Quinta Receita
        // ---------------------------------------------------------
        
        const fifthRecipeIngredients = [
            { name: "1 kg de camarão fresco", recipe: boboDeLagosta.map(record => record._id)},
            { name: "sal a gosto", recipe: boboDeLagosta.map(record => record._id)},
            { name: "3 dentes de alho picados e amassados", recipe: boboDeLagosta.map(record => record._id)},
            { name: "suco de 1 limão", recipe: boboDeLagosta.map(record => record._id)},
            { name: "pimenta-do-reino", recipe: boboDeLagosta.map(record => record._id)},
            { name: "1 kg de mandioca (prefira as que já vem embaladas e descascadas, é mais prático)", recipe: boboDeLagosta.map(record => record._id)},
            { name: "3 cebolas (1 cortada em rodelas e 2 raladas)", recipe: boboDeLagosta.map(record => record._id)},
            { name: "1 folha de louro", recipe: boboDeLagosta.map(record => record._id)},
            { name: "6 colheres (sopa) de azeite de oliva", recipe: boboDeLagosta.map(record => record._id)},
            { name: "2 vidros de leite de coco", recipe: boboDeLagosta.map(record => record._id)},
            { name: "1 maço de cheiro-verde picado", recipe: boboDeLagosta.map(record => record._id)},
            { name: "2 latas de molho pronto de tomate (pomarola)", recipe: boboDeLagosta.map(record => record._id)},
            { name: "2 pimentões verdes bem picadinhos", recipe: boboDeLagosta.map(record => record._id)},
            { name: "2 colheres (sopa) de azeite de dendê", recipe: boboDeLagosta.map(record => record._id)}
        ]
        
        conn.collection("ingredients").insertMany(fifthRecipeIngredients, async function(err, r) {
            if (err) throw err;
            // Creating the relationship between steps and the recipe
            const receitaCincoIngredientes = await Ingredient.find({recipe: receitaCinco});
            receitaCincoIngredientes.forEach(ingredient => {
                receitaCinco.ingredients.push(ingredient);
            });
            receitaCinco.save();
            
        });
        
        
        
        
        console.log("done");

        setTimeout(() => {
            conn.close();
        }, 3000);
    }
    catch (err) {
        console.log(err.message);
    }
}

seedDB();