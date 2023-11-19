import Link from "next/link";
import ReactMarkdown from "react-markdown";
import styles from "./proposal.module.scss";
import { HStack, VStack } from "@/components/Layout/Stack";
import ProposalStatus from "../ProposalStatus/ProposalStatus";

export default function Proposal({ proposal }) {
  return (
    <Link href={`/proposals/${proposal.id}`}>
      <HStack justifyContent="justify-between" alignItems="items-start" className="p-4 border-b-2">
        <VStack className={styles.cell_content} alignItems="items-start">
          <div className={styles.cell_content_title}>
            <>
              Proposal by {proposal.proposer}
              <span className={styles.proposal_status}></span>
            </>
          </div>
          <div className={styles.cell_content_body}>
            {proposal.markdowntitle.length > 100
              ? `${proposal.markdowntitle.slice(0, 98)}...`
              : proposal.markdowntitle}
          </div>
        </VStack>
        <VStack className={styles.cell_content} alignItems="items-center">
          <div className={styles.cell_content_title}>Title</div>
          <div className={styles.cell_content_body}>
            <ProposalStatus proposal={proposal} />
          </div>
        </VStack>
        <VStack className={styles.cell_content} alignItems="items-end">
          <div className={styles.cell_content_title}>Vote ended 2 days ago</div>
          <div className={styles.cell_content_body}>8 Options</div>
        </VStack>
      </HStack>
    </Link>
  );
}
