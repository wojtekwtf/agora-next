"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { VStack, HStack } from "@/components/Layout/Stack";
import styles from "./approvalVotesPanel.module.scss";
import OptionsResultsPanel from "../OptionResultsPanel/OptionResultsPanel";
import ApprovalProposalVotesList from "@/components/Votes/ApprovalProposalVotesList/ApprovalProposalVotesList";
import ApprovalProposalCriteria from "../ApprovalProposalCriteria/ApprovalProposalCriteria";
import ApprovalCastVoteButton from "@/components/Votes/ApprovalCastVoteButton/ApprovalCastVoteButton";

export default function ApprovalVotesPanel({
  proposal,
  initialProposalVotes,
  fetchVotesForProposal,
  fetchVotingPower,
  fetchAuthorityChains,
  fetchDelegate,
  fetchVoteForProposalAndDelegate,
}) {
  const [activeTab, setActiveTab] = useState(1);
  const [isPending, startTransition] = useTransition();
  function handleTabsChange(index) {
    startTransition(() => {
      setActiveTab(index);
    });
  }
  return (
    <motion.div
      className={styles.approval_votes_panel_container}
      initial={{ opacity: 1 }}
      animate={{ opacity: isPending ? 0.3 : 1 }}
      transition={{ duration: 0.3, delay: isPending ? 0.3 : 0 }}
    >
      <VStack className={styles.approval_votes_panel}>
        {/* Tabs */}
        <HStack className={styles.approval_vote_tab_container}>
          <div onClick={() => handleTabsChange(1)}>
            <span className={activeTab === 1 ? "text-black" : ""}>Results</span>
          </div>
          {initialProposalVotes.votes &&
            initialProposalVotes.votes.length > 0 && (
              <div onClick={() => handleTabsChange(2)}>
                <span className={activeTab === 2 ? "text-black" : ""}>
                  Votes
                </span>
              </div>
            )}
        </HStack>
        {activeTab === 1 ? (
          <OptionsResultsPanel proposal={proposal} />
        ) : (
          <ApprovalProposalVotesList
            initialProposalVotes={initialProposalVotes}
            fetchVotesForProposal={fetchVotesForProposal}
            proposal_id={proposal.id}
          />
        )}
        <ApprovalProposalCriteria proposal={proposal} />

        <div className={styles.button_container}>
          <ApprovalCastVoteButton
            proposal={proposal}
            fetchVotingPower={fetchVotingPower}
            fetchAuthorityChains={fetchAuthorityChains}
            fetchDelegate={fetchDelegate}
            fetchVoteForProposalAndDelegate={fetchVoteForProposalAndDelegate}
          />
        </div>
      </VStack>
    </motion.div>
  );
}
