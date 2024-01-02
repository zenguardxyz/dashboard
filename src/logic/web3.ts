import { AbstractProvider, ethers } from "ethers"
import { getSafeAppsProvider, isConnectedToSafe } from "./safeapp"
import { PROTOCOL_CHAIN_ID } from "./constants"
import { NetworkUtil } from "./networks";
import { InjectedConnector } from '@wagmi/core'
import { SignerOrProvider } from "@ethereum-attestation-service/eas-sdk/dist/transaction";
 

export const getProvider = async(): Promise<AbstractProvider> => {
    if (await isConnectedToSafe()) {
        console.log("Use SafeAppsProvider")
        return await getSafeAppsProvider()
    }
    const connector = new InjectedConnector()
    console.log(connector.getChainId())
    console.log("Use JsonRpcProvider")
    return new ethers.JsonRpcProvider(NetworkUtil.getNetworkById(await connector.getChainId())?.url)
}

export const getJsonRpcProvider = async(chainId: string): Promise<AbstractProvider> => {

    console.log("Use JsonRpcProvider")
    
    return new ethers.JsonRpcProvider(NetworkUtil.getNetworkById(parseInt(chainId))?.url)
}