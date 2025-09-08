import * as mongoose from "mongoose";

const URI =
    process.env.MONGODB_URI
const DB_NAME = process.env.MONGODB_DB


export async function connectMongoose() {
    console.log("Connecting mongoose....")
    mongoose.connect(`${URI}/${DB_NAME}`,
    )
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.log('Connexion à MongoDB échouée !'));
}
