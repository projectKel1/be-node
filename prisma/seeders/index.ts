// import fs from 'fs'
// import path from 'path'

// const currentDirectory = fs.readdirSync(__dirname).filter(file => file !== 'index.ts');

import { startRequestLeaves } from "./request-leaves"
import { startRequestReimburses } from "./request-reimbursment"
import 'dotenv/config'

( async () => {
    // for (let file of currentDirectory) {

    //     const readFile = path.join(__dirname, file)
    //     import
    //     await require(readFile)()
    
    // }

    if(process.env.DEVELOPMENT !== 'true') return console.log('Seeder only run in development!')

    try  {
        await startRequestLeaves()
        await startRequestReimburses()
    }catch (error: any) {
        throw new Error(error)
    }
})()