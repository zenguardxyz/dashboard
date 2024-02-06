import { Interface, ethers, Signer } from "ethers"
import protocolDeployments from "@safe-global/safe-core-protocol"
import { getProvider, getJsonRpcProvider } from "./web3"


const Metadata_PROVIDER_ABI = [
    "function retrieveMetadata(bytes32 metadataHash) external view returns (bytes metadata)"
]

const PLUGIN_ABI = [
    "function metadataHash() public view returns (bytes32 metadataHash)",
    "function metadataProvider() external view returns (uint256 providerType, bytes location)"
]

export const getManager = async(chainId: number) => {

    const provider = await getJsonRpcProvider(chainId)


    const registryInfo = protocolDeployments[chainId.toString() as keyof typeof protocolDeployments][0].contracts.SafeProtocolManagerAttestation;
    return new ethers.Contract(
        registryInfo.address,
        registryInfo.abi,
        provider
    )
}

export const getRegistry = async( chainId: number, signer?: Signer,) => {
    
    console.log

    const bProvider = await getJsonRpcProvider(chainId)

    const registryInfo = protocolDeployments[chainId.toString() as keyof typeof protocolDeployments][0].contracts.SafeProtocolRegistryAttestation;
    return new ethers.Contract(
        registryInfo.address,
        registryInfo.abi,
        signer ? signer : bProvider
    )
}

export const getPlugin = async(chainId: number, pluginAddress: string) => {

    const provider = await getJsonRpcProvider(chainId)
    return new ethers.Contract(
        pluginAddress,
        PLUGIN_ABI,
        provider
    )
}

export const getMetadataProvider = async(chainId: number, providerAddress: string) => {

    const provider = await getJsonRpcProvider(chainId)
    return new ethers.Contract(
        providerAddress,
        Metadata_PROVIDER_ABI,
        provider
    )
}