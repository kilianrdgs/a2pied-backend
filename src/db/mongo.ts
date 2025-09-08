import * as mongoose from "mongoose";

const URI =
    process.env.MONGODB_URI

export async function connectMongoose() {
    console.log("Connecting mongoose....")
    mongoose.connect(`${URI}`,
    )
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.log('Connexion à MongoDB échouée !'));
}
