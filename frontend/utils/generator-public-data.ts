import { Keypair } from "@solana/web3.js";
import * as fs from "fs";
import * as path from "path";

// Define the path to the .env.local file
const envFilePath = path.resolve(__dirname, "../.env.local");

// Function to check if a key exists in the .env.local file
const keyExistsInEnv = (key: string, filePath: string): boolean => {
  if (!fs.existsSync(filePath)) {

    // File doesn't exist, so the key doesn't exist either
    return false; 
  }
  
  const envFileContent = fs.readFileSync(filePath, "utf-8");
  return envFileContent.includes(`${key}=`);
};

// Check if the keys already exist in the .env.local file
const programIdKey = "NEXT_PUBLIC_PROGRAM_ID";
const dataAccountPubKeyKey = "NEXT_PUBLIC_DATA_ACCOUNT_PUBKEY";

const programIdExists = keyExistsInEnv(programIdKey, envFilePath);
const dataAccountPubKeyExists = keyExistsInEnv(dataAccountPubKeyKey, envFilePath);

if (programIdExists && dataAccountPubKeyExists) {
  console.log("Keys already exist in .env.local. No action taken.");
} else {
  // Generate and append only the keys that don't already exist
  let envContent = "";

  if (!programIdExists) {
    const programKeypair = Keypair.generate();
    const programId = programKeypair.publicKey.toBase58();
    envContent += `${programIdKey}=${programId}\n`;
  }

  if (!dataAccountPubKeyExists) {
    const dataAccountKeypair = Keypair.generate();
    const dataAccountPubKey = dataAccountKeypair.publicKey.toBase58();
    envContent += `${dataAccountPubKeyKey}=${dataAccountPubKey}\n`;
  }

  // Append the new content to the .env.local file if necessary
  if (envContent) {
    fs.appendFileSync(envFilePath, envContent.trim());
    console.log("Missing keys generated and saved to .env.local");
  }
}
