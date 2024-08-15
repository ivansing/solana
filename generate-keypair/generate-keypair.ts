import * as dotenv from 'dotenv'
dotenv.config({ path: '../.env'})
import { Keypair } from "@solana/web3.js"; 

export const secretKeyStr = process.env.SECRET_KEY; 
console.log(secretKeyStr)

if (secretKeyStr) {
  try {
    
    const secretKeyArray = JSON.parse(secretKeyStr);

   
    if (secretKeyArray.length !== 64) {
      throw new Error('Invalid secret key length. It should be 64 bytes.');
    }

    // Convert the array to a Uint8Array
    const secretKeyUint8Array = new Uint8Array(secretKeyArray);

    // Create a Keypair from the secret key
    const keypair = Keypair.fromSecretKey(secretKeyUint8Array);
    console.log("keypair", keypair)

    console.log(
      `✅ Finished! We've loaded our secret key securely, using an env file!`
    );
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
} else {
  console.error('❌ Error: SECRET_KEY is not defined in the environment');
}
