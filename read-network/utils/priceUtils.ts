import axios from 'axios'

export const getSOLPriceInUSD = async (): Promise<number | null> => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd')
        return response.data.solana.usd;
    } catch (error) {
        console.error('Error fetching SOL price:', error)
        return null;
    }
};

export const convertSOLToUSD = async (solAmount: number): Promise<number | null> => {
    const solPriceInUSD = await getSOLPriceInUSD();
    if(solPriceInUSD === null) {
        console.error('Could not fetch SOL price in USD')
        return null;
    }
    return solAmount * solPriceInUSD
}