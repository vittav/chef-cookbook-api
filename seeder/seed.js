// Setting up the models

const Recipe = require('../models/recipe.model');
// const Step = require('../models/step.model');
// const Ingredient = require('../models/ingredient.model');
// const IngredientQuantity = require('../models/ingredient_quantity.model');
// const User = require('../models/user.model');

// Setting up db
// const mongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');
const { query } = require('express');


async function seedDB() {
var url = "mongodb://127.0.0.1:27017/tagme";
mongoose.connect(url);
let conn = mongoose.connection;

console.log("connected correctly to server");

// Erase all data in the db so we do not create duplicates
console.log("Starting to clean the db...")
conn.collection("users").drop();
conn.collection("recipes").drop();
conn.collection("steps").drop();
console.log("Done")

// Criando os Chefs
console.log("Creating the Chefs...")
const users = [
    {name: "Chef Fogaça", email: "fogaca@cocobambu.com", password: "12345678"},
    {name: "Chef Jaquin", email: "jaquin@cocobambu.com", password: "12345678"},
    {name: "Chef Paola", email: "paola@cocobambu.com", password: "12345678"}
];
conn.collection("users").insertMany(users, function (err, r) {
    if (err) throw err;
    conn.close();
})
console.log("Done")

// Criando as receitas
console.log("Creating the recipes...")


    // Primeira receita
    let arrozDeMariscos = {
        name: "Arroz de Mariscos para 2 pessoas",
        description: "Arroz com camarão, lula, peixe, lagosta, e mexilhão, refogado com pimentões e cebola juliene, temperos e um leve toque de açafrão. Servidos na paellera. Rico em sabor e apresentação.",
        duration: "25 minutos"
    };
    conn.collection("recipes").insertOne(arrozDeMariscos);
    arrozDeMariscos = await conn.collection("recipes").findOne({ name: "Arroz de Mariscos para 2 pessoas"}, function (err, recipe) {
        console.log(recipe)
    })

    // Segunda receita
    let moquecaTropical = {
        name: "Moqueca Tropical",
        description: "Escolha entre Camarão ou Peixe ou a combinação dos dois | De origem indígena. A moqueca é um cozido de peixe ou camarão ou com mistura de peixe e camarão com tomate, cebola, pimentões e cheiro-verde refogados. Leve toque de azeite de dendê e leite de coco natural. Na versão tropical, acrescentamos manga e abacaxi. Acompanha arroz branco, pirão de camarão e farofa de dendê",
        duration: "40 minutos"
    };
    conn.collection("recipes").insertOne(moquecaTropical);
    moquecaTropical = await conn.collection("recipes").find({ name: "Moqueca Tropical"})

    // Terceira receita
    let frutosDoMarAoAzeiteDeErvas = {
        name: "Frutos do Mar ao Azeite de Ervas",
        description: "Para apreciadores de frutos do mar, com leve aroma de azeite de ervas finas. Mexilhões, polvo, peixe, camarão e lula salteados com azeite, champignon, cebola picada,pimentão, alho, alcaparras e brócolis. Servidos com arroz de brócolis e legumes salteados",
        duration: "30 minutos"
    };
    conn.collection("recipes").insertOne(frutosDoMarAoAzeiteDeErvas);
    frutosDoMarAoAzeiteDeErvas = await conn.collection("recipes").findOne({ name: "Frutos do Mar ao Azeite de Ervas"})
    // console.log(frutosDoMarAoAzeiteDeErvas)

    // Quarta receita
    let massaEspagueteAItaliana = {
        name: "Massa espaguete à Italiana",
        description: "Espaguete italiano coberto com mexilhões, lula, polvo, camarões, salteados no azeite com alho, cebola, molho de tomates frescos e manjericão.",
        duration: "18 minutos"
    };
    conn.collection("recipes").insertOne(massaEspagueteAItaliana);
    massaEspagueteAItaliana = await conn.collection("recipes").find({ name: "Massa espaguete à Italiana"})

    // Quinta receita
    let boboDeLagosta = {
        name: "Bobó de Lagosta",
        description: "De origem indígena com toques cearenses. Esta moqueca de lagosta é feita com verduras refogadas acrescidas de leite de coco, azeite de dendê e coentro. Acompanha arroz branco, pirão de camarão e farofa de dendê",
        duration: "50 minutos"
    };
    conn.collection("recipes").insertOne(boboDeLagosta);
    boboDeLagosta = await Recipe.find({ name: "Bobó de Lagosta" });
    // console.log(Recipe.find());

    console.log("Done")
    
    
    
    // Criando os passos e associando às receitas
    console.log("Adding the steps to the recipes...")
    
    const firstRecipeSteps = [
        { number: 1, description: "Faça um refogado com o azeite a cebola e os dentes de alho bem picados. Esmague os tomates maduros sem pele e junte ao refogado. Tempere com sal. Deixe 'namorar' durante alguns minutos.", recipe: arrozDeMariscos.id},
        { number: 2, description: "Deixe a descongelar a embalagem de cocktail de marisco e delícias do mar, retire-as também do congelador e ponha-as de parte.", recipe: arrozDeMariscos.id},
        { number: 3, description: "Junte os mariscos (as delícias ficam para mais tarde) ao refogado e mexa. Com o lume brando, tape o tacho e deixe 'namorar' durante 15 minutos. ", recipe: arrozDeMariscos.id},
        { number: 4, description: "Junte água a tapar esta mistura e assim que ferver deite o arroz e mexa. Quando retomar a fervura, deixe cozer tapado durante 10 minutos, vá mexendo para não pegar.", recipe: arrozDeMariscos.id},
        { number: 5, description: "Apague o lume, junte as delícias cortadas em cubinhos e polvilhe com coentros picados. Sirva de seguida.", recipe: arrozDeMariscos.id},
        { number: 6, description: "Depois temos o Arroz de Marisco Tradicional que leva todo o tipo marisco, desde sapateira, lagosta, mexilhões e etc", recipe: arrozDeMariscos.id}
    ]
    conn.collection("steps").insertMany(firstRecipeSteps)
    
    
    // ],
    // ingredients: [
        //     {name: "1 cebola"},
        //     {name: "2 dentes de alho"},
        //     {name: "3 colheres de sopa de Azeite"},
        //     {name: "4 tomates"},
        //     {name: "2 Pitadas de Sal"},
        //     {name: "1 embalagem de marisco(mistura)"},
        //     {name: "1 embalagem de camarão inteiro congelado"},
        //     {name: "1 chávena de arroz"},
        //     {name: "1 porção de coentros"}
        // ]
        
        
        
        // const recipesData = [];
}

seedDB();