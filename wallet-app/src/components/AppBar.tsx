import { FC } from "react";
import styles from '../styles/Home.module.css'
import Image from "next/image";
import dynamic from "next/dynamic";
const WalletMultiButton = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton), { ssr: false });


export const AppBar: FC = () => {
    return(
        <div className={styles.AppHeader}>
            <Image src="/solanaLogo.png" height={30} width={200} alt="logo-image"/>
            <span>Wallet-Adapter Example</span>
            <WalletMultiButton />
        </div>
    )
}