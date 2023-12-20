import { ConnectKitButton } from "connectkit";
import styles from "./header.module.scss";
import ENSAvatar from "../shared/ENSAvatar";
import HumanAddress from "../shared/HumanAddress";
import { Delegate } from "@/app/api/delegates/delegate";
import { DesktopProfileDropDown } from "./DesktopProfileDropDown";

export function DesktopConnectButton({
  delegate,
}: {
  delegate: Delegate | undefined;
}) {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
        return (
          <button className={styles.desktop_connect_button}>
            {isConnected ? (
              <DesktopProfileDropDown ensName={ensName} delegate={delegate} />
            ) : (
              "Connect Wallet"
            )}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
