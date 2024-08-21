import { FC, useEffect, useState } from "react";
import styles from '../styles/PingButton.module.css';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";

const pubKeyId = process.env.NEXT_PUBLIC_PROGRAM_ID;
const pubKeyStrData = process.env.NEXT_PUBLIC_DATA_ACCOUNT_PUBKEY;

if (!pubKeyId || !pubKeyStrData) {
    throw new Error("Environment variables NEXT_PUBLIC_PROGRAM_ID or NEXT_PUBLIC_DATA_ACCOUNT_PUBKEY are missing.");
}

export const PingButton: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const onClick = async () => {
        if (!connection || !publicKey) {
            console.error("Connection or publicKey is not available.");
            return;
        }

        try {
            const programId = new web3.PublicKey(pubKeyId);
            const programDataAccount = new web3.PublicKey(pubKeyStrData);
            const transaction = new web3.Transaction();

            const instruction = new web3.TransactionInstruction({
                keys: [
                    {
                        pubkey: programDataAccount,
                        isSigner: false,
                        isWritable: true,
                    },
                ],
                programId,
            });

            transaction.add(instruction);
            const signature = await sendTransaction(transaction, connection);
            console.log(signature);
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    };

    return (
        isClient && (
            <div className={styles.buttonContainer}>
            {isClient ? (
                <button className={styles.button} onClick={onClick}>
                    <i>Ping!</i>
                </button>
            ) : (
                <button className={styles.button} disabled>
                    <i>Loading...</i>
                </button>
            )}
        </div>
        )
    );
};
