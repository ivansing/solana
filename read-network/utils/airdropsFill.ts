import 'dotenv/config'
import {conn} from '../connect'
import { airdropIfRequired } from '@solana-developers/helpers'
import * as web3 from "@solana/web3.js"

export const airdropsFill = async (payer: web3.Keypair): Promise<void>  => {
    let success = false
    let attempts = 0
    const maxAttempts = 3

    const connection = conn()

    while (!success && attempts < maxAttempts) {
        attempts++
        try {
            const newBalance = await airdropIfRequired(
                connection,
                payer.publicKey,
                1 * web3.LAMPORTS_PER_SOL,
                0.5 * web3.LAMPORTS_PER_SOL,
            );
            success = true
            console.log(`✅ Airdrop successful on attempt ${attempts}`)
        } catch (airdropError) {
            console.warn(`⚠️ Airdrop attempt ${attempts} failed: ${airdropError.message}`)
            if (attempts >= maxAttempts) {
                throw new Error('Exceeded maximum airdrop attempts');

            }
        }
    }
}
