// import fs from 'fs'
// import path from 'path'

// const currentDirectory = fs.readdirSync(__dirname).filter(file => file !== 'index.ts');

import { startRequestSeeder } from "./request-leaves"
import 'dotenv/config'

( async () => {
    // for (let file of currentDirectory) {

    //     const readFile = path.join(__dirname, file)
    //     import
    //     await require(readFile)()
    
    // }

    if(process.env.DEVELOPMENT !== 'true') return console.log('Seeder only run in development!')

    try  {
        await startRequestSeeder()
    }catch (error: any) {
        throw new Error(error)
    }
})()