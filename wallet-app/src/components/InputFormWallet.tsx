import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import React, { FC, useState } from 'react'
import * as web3 from "@solana/web3.js"
import styles from '../styles/Home.module.css'

export const InputFormWallet: FC = () => {
    const [amount, setAmount] = useState<string>("")
    const [recipient, setRecipient] = useState<string>("")
    const { connection } = useConnection()
    const { publicKey, sendTransaction } = useWallet()
    const [transactionLink, setTransactionLink] = useState<string>("")

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value)
    }

    const handleRecipientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRecipient(event.target.value)
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (!connection || !publicKey) {
            console.error("Connection or publickey is not available.")
            return
        }

        try {
            const lamports = parseFloat(amount) * web3.LAMPORTS_PER_SOL
            const recipientPubKey = new web3.PublicKey(recipient)
            const transaction = new web3.Transaction()

            const sendSolInstruction = web3.SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: recipientPubKey,
                lamports,
            })

            transaction.add(sendSolInstruction)


            const signature = await sendTransaction(transaction, connection)
            const explorerUrl = `https://explorer.solana.com/tx/${signature}?cluster=devnet`
            setTransactionLink(explorerUrl)

        } catch (error) {
            console.error("Transaction failed:", error)
        }
    }

    return (
        <div className={styles.AppBody}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <p>Amount (in SOL) to send:</p>
                <input
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Enter amount"
                    className={`${styles.input} ${styles.formField}`}
                />
                <br />
                <p>Send SOL to:</p>
                <input
                    type="text"
                    value={recipient}
                    onChange={handleRecipientChange}
                    placeholder="Enter recipient address"
                    className={`${styles.input} ${styles.formField}`}
                />
                <br />
                {transactionLink && (
                    <a 
                    href={transactionLink} 
                    target="_blank"
                    className={styles.transactionLink}
                    >
                        Check transaction at Solana Explorer
                    </a>

                )}
                <br />
                <button type="submit" className={`${styles.input} ${styles.formField}`}>Send SOL</button>
            </form>

        </div>
    )
}