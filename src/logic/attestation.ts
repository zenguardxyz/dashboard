import { Interface, ethers, Signer } from "ethers"
import { AddressZero } from "@ethersproject/constants";
import { InjectedConnector, getWalletClient } from '@wagmi/core'
import { Attestation, EAS, Offchain, SchemaEncoder, SchemaRegistry, SchemaDecodedItem } from "@ethereum-attestation-service/eas-sdk";
import { SignerOrProvider } from "@ethereum-attestation-service/eas-sdk/dist/transaction";

import {  getRegistry } from "./protocol";
import { getProvider } from "./web3"

import Safe from "../assets/icons/safe.png";
import OZ from "../assets/icons/oz.png";
import Certik from "../assets/icons/certik.png";
import ZenGuard from "../assets/icons/zenguard.png";
import { useEthersSigner } from "@/utils/wagmi";


const EASAddresses = { '84531': {EASAddress: "0x4200000000000000000000000000000000000021", schemaId: "0xf79919ba6a03ab2adce36fcf31344023d006fd3418dd33499d3f8b8aa54fabda"},
                       '11155111': {EASAddress: "0xC2679fBD37d54388Ce493F1DB75320D236e1815e", schemaId: "0xf79919ba6a03ab2adce36fcf31344023d006fd3418dd33499d3f8b8aa54fabda"}}

const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';

const ATTESTER_INFO = { '0x958543756A4c7AC6fB361f0efBfeCD98E4D297Db' : {
    logo: '',
    link: 'https://twitter.com/VitalikButerin',
    name: 'Vitalik Buterin',
    trust: 9,
},
'0xd5B5Ff46dEB4baA8a096DD0267C3b81Bda65e943' : {
    logo: OZ,
    link: 'https://www.openzeppelin.com',
    name: 'OpenZeppelin',
    trust: 9,
},
'0xaA498424C846c44e2029E1835f9549d86d7C5E44' : {
    logo: Safe,
    link: 'https://safe.global',
    name: 'Safe Audits',
    trust: 10,
},
'0x41FcBCF170905694E34a4beE398B36A60Af3bEa2' : {
    logo: Certik,
    link: 'https://www.certik.com/',
    name: 'Certik Audits',
    trust: 6,
},

}

const PUBLISHER_INFO = {
    '0xd5B5Ff46dEB4baA8a096DD0267C3b81Bda65e943': {
      logo: OZ,
      link: 'https://www.openzeppelin.com',
      name: 'OpenZeppelin',
      trust: 9,
    },
    '0x958543756A4c7AC6fB361f0efBfeCD98E4D297Db': {
      logo: ZenGuard,
      link: 'https://www.zenguard.xyz',
      name: 'ZenGuard',
      x: 'zenguardxyz',
      github: 'zenguardxyz',
      trust: 9,
    },
    '0xaA498424C846c44e2029E1835f9549d86d7C5E44': {
      logo: Safe,
      link: 'https://safe.global',
      name: 'Safe Ecosystem',
      trust: 10,
    },
  }



export const loadPublisher = (address: `0x${string}`) => {
    return Object(PUBLISHER_INFO)[address]
  }

export const loadAttestation = async(integration: string): Promise<string> => {

    const registry = await getRegistry()
    const { attestationId }  = await registry.checkAttest(integration)
    return attestationId

}


export const listAttestation = async(address: string): Promise<string> => {

    const registry = await getRegistry()
    const { attestationId }  = await registry.listedAttestations(address)
    return attestationId;
}

export const isValidAttestation = async(attestionId: string): Promise<boolean> => {


    const provider =  await getProvider()


    // Initialize the sdk with the address of the EAS Schema contract address
    const chainId =  (await provider.getNetwork()).chainId.toString()
    const eas = new EAS(Object(EASAddresses)[chainId].EASAddress);

    
      
    eas.connect(provider as any)
    return  eas.isAttestationValid(attestionId)
}

export const loadAttestationDetails = async(attestionId: string): Promise<Attestation> => {

        //  type SignerOrProvider = ethers.Signer | ethers.Provider;
        const provider =  await getProvider()

        // Initialize the sdk with the address of the EAS Schema contract address
        const chainId =  (await provider.getNetwork()).chainId.toString()

        // Initialize the sdk with the address of the EAS Schema contract address
        const eas = new EAS(Object(EASAddresses)[chainId].EASAddress);
        
        eas.getAttestation

        eas.connect(provider as any)
        return eas.getAttestation(attestionId)
}


export const loadAttestationData = async(data: string, schema: string): Promise<SchemaDecodedItem[]> => {

     //  type SignerOrProvider = ethers.Signer | ethers.Provider;
     const provider =  await getProvider()

     // Initialize the sdk with the address of the EAS Schema contract address
     const chainId =  (await provider.getNetwork()).chainId.toString()

    // Initialize the sdk with the address of the EAS Schema contract address
    const eas = new EAS(Object(EASAddresses)[chainId].EASAddress);

    // const schema = 'string docURI,uint8 rating'
    const schemaEncoder = new SchemaEncoder(schema);

    return schemaEncoder.decodeData(data)

}

// export const createAttestation = async (value: any []) => {

//     const provider =  new ethers.BrowserProvider(window.ethereum as any)
//     const chainId =  (await provider.getNetwork()).chainId.toString()

//     const eas = new EAS(Object(EASAddresses)[chainId].EASAddress);
    
//     eas.connect(await provider.getSigner() as any)

//     const schema = 'string docURI,uint8 rating'
//     const schemaEncoder = new SchemaEncoder(schema);

//     const encodedData = schemaEncoder.encodeData([
//     { name: "docURI", value: value[0], type: "string" },
//     { name: "rating", value: value[1], type: "uint8" },
//     ]);
    

//     const attestationTx = await eas.attest(   {
//         schema: Object(EASAddresses)[chainId].schemaId,
//         data: ({
//             recipient: AddressZero, // No recipient
//             // expirationTime: 0, // No expiration time
//             revocable: true,
//             refUID: ZERO_BYTES32, // No references UI
//             data: encodedData, // Encode a single uint256 as a parameter to the schema
//             // value: 0 // No value/ETH
//         })
//     })

//     const attestation = await attestationTx.wait()

//     return attestation

// }



// export const attestIntegration = async (plugin: string, attestation: string) => {

//     const provider =  new ethers.BrowserProvider(window.ethereum)
//     const chainId =  (await provider.getNetwork()).chainId.toString()

//     const registry = await getRegistry(await provider.getSigner())
//     const attestationTx = await registry.attestIntegration(plugin, Object(EASAddresses)[chainId].EASAddress, attestation)
//     await attestationTx.wait()

// }

export const attestPublisher = async (attestation: string, signer: Signer) => {


    const registry = await getRegistry(signer);
    const attestationTx = await registry.attestPublisher(attestation);
    await attestationTx.wait()

}


export const loadAttester =  (address: string) => {

    return Object(ATTESTER_INFO)[address]

}


export const addIntegration = async (module: string, signer: Signer) => {

    const registry = await getRegistry(signer);
    const integratioTx = await registry.addIntegration(module, 1);
    await integratioTx.wait()

}

export const verificationDetails =  async (address: string) => {

   const attestationId = await  listAttestation(address)
   console.log(attestationId)
   try {

          const {  data } =   await loadAttestationDetails(attestationId);

          console.log(data)

          const schema = 'bool verified, uint8 score, uint8[] profiles'

          const attestationData  = await loadAttestationData(data, schema);

          return {verified: attestationData[0].value.value,
                  score: attestationData[1].value.value,
                  profiles: (attestationData[2].value.value as any).toArray()}


   }
   catch(e) {
       return {}
   }

}

// attestationData[1].value.value