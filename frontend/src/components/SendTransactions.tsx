import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from '@solana/web3.js';

const {publicKey, sendTransaction} = useWallet();
const {connection} = useConnection();

const sendSol = async (event: any ) => {
    event.preventDefault();

    const transaction = new web3.Transaction();
    const recipientPubKey = new web3.PublicKey(event.target.recipient.value);

    const sendSolInstruction = web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPubKey,
        lamports: 0.1 * web3.LAMPORTS_PER_SOL,
    });

    transaction.add(sendSolInstruction);
    const signature = sendTransaction(transaction, connection)
    console.log(signature)
}

export default sendSol;