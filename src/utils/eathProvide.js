import * as React from "react";
import { usePublicClient } from "wagmi";
import { FallbackProvider, JsonRpcProvider } from "ethers";

export function publicClientToProvider(publicClient) {
	const { chain, transport } = publicClient;
	const network = {
		chainId: chain.id,
		name: chain.name,
		ensAddress: chain.contracts?.ensRegistry?.address,
	};

	if (transport.type === "fallback") {
		const providers = transport.transports.map(({ value }) => new JsonRpcProvider(value?.url, network));

		if (providers.length === 1) return providers[0];

		return new FallbackProvider(providers);
	}

	return new JsonRpcProvider(transport.url, network);
}

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export function useEthersProvider({ chainId } = {}) {
	const publicClient = usePublicClient({ chainId });
	return React.useMemo(() => publicClientToProvider(publicClient), [publicClient]);
}
