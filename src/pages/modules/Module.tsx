import { FunctionComponent, useCallback, useEffect, useState } from "react";


import "./Module.css";
import { PluginMetadata } from "../../logic/metadata";
import { PluginDetails, disablePlugin, enablePlugin, loadPluginDetails } from "../../logic/plugins";
import { openSafeApp } from "../../logic/safeapp";
import { GenericCard } from "../../components";
import { useNavigate } from "react-router-dom";
import usePluginStore from "../../store/plugin/plugin.store";
import { RoutePath } from "../../navigation";

type ModuleMetaProps = {
    metadata: PluginMetadata;
  };

const ModuleMeta: FunctionComponent<ModuleMetaProps> = ({ metadata }) => {
    return (
        <>
            {metadata.name} - {metadata.version}
        </>
    );
};

type ModuleProps = {
  address: string;
  publisher: string;
  pluginDetails?: any
};

export const Module: FunctionComponent<ModuleProps> = ({ address, publisher, pluginDetails }) => {
    const [details, setDetails] = useState<PluginDetails|undefined>(undefined);
    const navigate = useNavigate();

    const { setPluginDetails } = usePluginStore(
        (state: any) => state
      );
    useEffect(() => {
        const fetchData = async() => {
            try {
                setDetails(pluginDetails ? pluginDetails : await loadPluginDetails(address))
            } catch(e) {
                console.warn(e)
            }
        }
        fetchData();
    }, [address])

    const handleClick = (details: any) => {

        setPluginDetails({ ...details, address: address, publisher: publisher});
        navigate(RoutePath.pluginDetails); 

    }

    return (

            <GenericCard
            title={details?.metadata.name}
            image={details?.metadata.iconUrl}
            enabled={details?.enabled}
            loading={ details == undefined }
            publisher={publisher}
            onClick={ () => handleClick(details) }
            />
            



    );
};
