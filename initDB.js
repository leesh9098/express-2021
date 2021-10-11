import db from './src/models/index.js'
import bcrypt from 'bcrypt';
import faker from "faker";


const { User, Board } = db;

faker.locale = "ko";

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


/* User 데이터 생성 */
const user_sync = async () => {
    await User.sync({ force: true }); // { force: true }: User 초기화
    for (let i=0; i<1000; i++) {
        const hashPwd = await bcrypt.hash("test1234", 10);
        await User.create({
            name: faker.name.lastName()+faker.name.firstName(),
            age: getRandomInt(15,50),
            password: hashPwd
        });
    }
}
user_sync();

// Board 데이터 생성 
const board_sync = async () => {
    await Board.sync({ force: true }); // { force: true }: User 초기화
    for (let i=0; i<1000; i++) {
        await Board.create({
            title: faker.lorem.sentence(1),
            content: faker.lorem.sentence(10),
            userId: getRandomInt(1, 1000)
        });
    }
}
board_sync();
