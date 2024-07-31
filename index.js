const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./optionts')

const token = '6483183105:AAF5qeJkzw2cM5MHC5dBqFvfXiWgZC_iTt4'

const bot = new TelegramApi(token, {polling: true})


const chats = {}



const  startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Поиграть захотелось Поиграем...')
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Ну угадывай че', gameOptions)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Запустить Бота'},
        {command: '/info', description: 'Получить информацию про Бота'},
        {command: '/game', description: 'Ю вана плей Летс плей'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendMessage(chatId, `Я запустился`);
        } else if (text === '/info') {
            await bot.sendMessage(chatId, `Прости ${msg.from.first_name}, тут по идее должна была быть подробная информация про меня, но разработчик 3 2 раз`);
            return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/594/a68/594a68b0-0e5d-46ce-b2b3-ffd6ee7fe9f6/10.webp');
        } else if (text === '/game') {
            return startGame(chatId);
        } else {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/fe1/2e1/fe12e10f-402b-4509-b663-f1738dcb6c68/3.webp');
            return bot.sendMessage(chatId, 'Я хз че ты хочешь от меня');
        }
    });

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again'){
            return startGame(chatId)
        }
        if (data == chats[chatId]) {
            return bot.sendMessage(chatId, `Ого ты смог угодать получаеться поздровляю цыфры и правда была ${chats[chatId]} `, againOptions)
        } else {
            return bot.sendMessage(chatId, `Ну ты не угодал повезет в следущий раз , а цыфра была ${chats[chatId]} `, againOptions)
        }
    })
}

start()