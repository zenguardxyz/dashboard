import { ZeroAddress, EventLog, BigNumberish, ethers } from "ethers";
import { BaseTransaction } from '@safe-global/safe-apps-sdk';
import { PluginMetadata, loadPluginMetadata } from "./metadata";
import { getManager, getPlugin, getRegistry } from "./protocol";
import { getSafeInfo, isConnectedToSafe, submitTxs } from "./safeapp";
import { isModuleEnabled, buildEnableModule, isGuardEnabled, buildEnableGuard } from "./safe";
import { getJsonRpcProvider, getProvider } from "./web3";
import WhitelistHook from "./WhitelistHook.json"



const SENTINEL_MODULES = "0x0000000000000000000000000000000000000001"



export interface PluginDetails {
    metadata: PluginMetadata,
    enabled?: boolean
}

export const loadPluginDetails = async(pluginAddress: string, chainId: number): Promise<PluginDetails> => {
    const plugin = await getPlugin(chainId, pluginAddress)
    console.log(plugin)
    const metadata = await loadPluginMetadata(plugin, chainId)
    if (!await isConnectedToSafe()) return { metadata }
    return  { metadata, enabled: false }
}


export const loadPlugins = async(filterFlagged: boolean = true, chainId: number): Promise<any[]> => {
    const registry = await getRegistry(chainId)
    console.log(registry)
    const addedEvents = (await registry.queryFilter(registry.filters.IntegrationAdded)) as EventLog[]
    const addedIntegrations = addedEvents.map((event: EventLog) => ({ publisher: event.args.publisher, integration: event.args.integration}))
    if (!filterFlagged) return addedIntegrations;
    const flaggedEvents = (await registry.queryFilter(registry.filters.IntegrationFlagged)) as EventLog[]
    const flaggedIntegrations = flaggedEvents.map((event: EventLog) => ({ publisher: event.args.publisher, intergation: event.args.integration }))
    return addedIntegrations.filter((data) => flaggedIntegrations.indexOf(data.integration) < 0)
}


export const loadAttestation = async(integration: string, chainId: number): Promise<string> => {

    const registry = await getRegistry(chainId)
    const { attestationId }  = await registry.checkAttest(integration)
    return attestationId

}


