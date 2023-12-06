"use client";

import { useEffect, useState } from "react";
import { useEnsName } from "wagmi";

function truncateAddress(address) {
  return `${address.substring(0, 4)}...${address.substring(
    address.length - 4
  )}`;
}

// This component will display the ENS name for a given address
const ENSName = ({ address }) => {
  const [ensName, setEnsName] = useState(truncateAddress(address));

  const { data } = useEnsName({ chainId: 1, address });

  useEffect(() => {
    if (data) {
      setEnsName(data); // Set ENS name if available
    } else {
      setEnsName(truncateAddress(address)); // Fallback to truncated address
    }
  }, [data, address]);

  return <span>{ensName}</span>;
};

export default ENSName;
