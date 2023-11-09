import {Client, Account, Databases} from 'appwrite'

const client = new Client();




client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65490e80b89f942865ab');

const databases = new Databases(client);
const account = new Account(client);

export {databases, account}