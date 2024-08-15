import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { conn } from "./connect"

const suppliedPublicKey = process.argv[2]
if (!suppliedPublicKey) {
    throw new Error("Provide a public key to check the balance of!")
}

let publicKey: PublicKey

try {
    publicKey = new PublicKey(suppliedPublicKey)
} catch (error) {
    console.error(`❌ Error: Invalid public key format. ${error.message}`);
    process.exit(1);
}

const connection = conn();

async function checkBalance() {
    try {
        const balanceInLamports = await connection.getBalance(publicKey)
        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL

        console.log(
            `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
        );

    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
    }
}

checkBalance()


