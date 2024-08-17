import 'dotenv/config'
import * as web3 from '@solana/web3.js'
import { airdropsFill } from './utils/airdropsFill';

const secretKeyStr = process.env.SECRET_KEY2

if(!secretKeyStr) {
    console.error('❌ Error: SECRET_KEY_SENDER is not defined in the environment');
    process.exit(1)
}

// Convert secret key from env variable 
const secretKeyArraySender = JSON.parse(secretKeyStr) as number[];

if(secretKeyArraySender.length !== 64) {
    console.error('❌ Error: Invalid secret key length. It should be 64 bytes.')
    process.exit(1)
}

// Create keypair object
const senderKeypair = web3.Keypair.fromSecretKey(new Uint8Array(secretKeyArraySender));

const recipientPublicKeyStr = process.argv[2];
if(!recipientPublicKeyStr) {
    console.error('❌ Error: Recipient public key is not provided as a command-line argument');
    process.exit(1)
}

let recipientPublicKey: web3.PublicKey
try {
    recipientPublicKey = new web3.PublicKey(recipientPublicKeyStr)
} catch (error) {
    console.error('❌ Error: Invalid recipient public key');
    process.exit(1)
}

const amount = 0.01 * web3.LAMPORTS_PER_SOL;



const performTrasaction = async () => {
    try {


        console.log(`✅ Loaded our own keypair from the environment variable`);


        const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');

        // Check SOL balance
        const balance = await connection.getBalance(senderKeypair.publicKey);
        console.log(`🔍 Current SOL balance: ${balance / web3.LAMPORTS_PER_SOL} SOL`)

        if(balance < 0.5 * web3.LAMPORTS_PER_SOL) {
            console.log(`⚠️ Low balance detected. Initiating airdrop...`);
            await airdropsFill(senderKeypair)
        }
        
        // Create and send transfer transaction
        const transaction = new web3.Transaction().add(
           web3.SystemProgram.transfer({
            fromPubkey: senderKeypair.publicKey,
            toPubkey: recipientPublicKey,
            lamports: amount,
           })
        )

        const signature = await web3.sendAndConfirmTransaction(
            connection,
            transaction,
            [senderKeypair],
        )

        console.log(`✅ Transaction completed! Signature is ${signature}`)
        console.log(
            `You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
          );
    } catch (error) {
        console.error(`❌ Error: ${error.message}`)
    }
}
performTrasaction()
