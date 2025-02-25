import { usePathname } from "next/navigation";
import * as theme from "@/styles/theme";
import { css } from "@emotion/css";
import { HStack } from "../Layout/Stack";
import { HeaderLink } from "./HeaderLink";
import styles from "./header.module.scss";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <HStack className={styles.main_nav}>
      <HeaderLink
        href="/"
        isActive={pathname.includes("proposals") || pathname === "/"}
      >
        Proposals
      </HeaderLink>

      <HeaderLink href="/delegates" isActive={pathname.includes("delegates")}>
        Voters
      </HeaderLink>
    </HStack>
  );
}
