"use client";

import { useRef } from "react";
import styles from "./styles.module.scss";
import { UseForm, useForm } from "@/app/lib/hooks/useForm";
import { HStack, VStack } from "@/components/Layout/Stack";
import ProposalTypeRow from "./ProposalTypeRow";
import TitleDescriptionRow from "./TitleDescriptionRow";
import ApprovalCriteriaRow from "./ApprovalCriteriaRow";
import ApprovalOptionsRow from "./ApprovalOptionsRow";
import StandardForm from "./StandardForm";
import SubmitButton from "./SubmitButton";

type FormValues = {
  proposalType: "Basic" | "Approval";
  proposalSettings: string;
  title: string;
  description: string;
  budget: number;
  maxOptions: number;
  criteriaType: "Threshold" | "Top Choices";
  threshold: number;
  topChoices: number;
  options: Option[];
};

type Option = {
  title: string;
  transactions: Transaction[];
};

export type Transaction = {
  type: "Transfer" | "Custom";
  target: string;
  value: number;
  calldata: string;
  transferAmount: number;
  transferTo: string;
};

export type Form = UseForm<FormValues>;

export default function CreateProposalForm({
  proposalSettingsList,
}: {
  proposalSettingsList: any[];
}) {
  const initialFormValues: FormValues = {
    proposalType: "Basic",
    proposalSettings: "0",
    title: "",
    description: "",
    budget: 0,
    maxOptions: 1,
    criteriaType: "Threshold",
    threshold: 0,
    topChoices: 1,
    options: [{ title: "", transactions: [] }],
  };
  const form = useForm<FormValues>(() => initialFormValues);
  const formTarget = useRef<HTMLFormElement>(null);

  console.log(form.state.proposalType);
  return (
    <VStack className="w-full">
      <form ref={formTarget}>
        <VStack className={styles.create_prop_form}>
          <div className={styles.create_prop_form__box}>
            <h1 className={styles.create_prop_form__heading}>
              Create proposal
            </h1>
            <p className={styles.create_prop_form__subheading}>
              Select the type of vote and proposal you want to create, and
              describe its intent to voters. Remember to proofread as proposals
              cannot be edited once published.
            </p>
            <ProposalTypeRow
              form={form}
              proposalSettingsList={proposalSettingsList}
            />
            <TitleDescriptionRow form={form} />
          </div>
          {form.state.proposalType === "Approval" && (
            <>
              <div className={styles.create_prop_form__box}>
                <ApprovalCriteriaRow form={form} />
              </div>
              <div className={styles.create_prop_form__box}>
                <ApprovalOptionsRow form={form} />
              </div>
            </>
          )}
          {form.state.proposalType === "Basic" && (
            <div className={styles.create_prop_form__box}>
              <StandardForm form={form} />
            </div>
          )}
          <HStack
            justifyContent="justify-between"
            alignItems="items-center"
            className={styles.create_prop_form__submit_container}
          >
            <p className={styles.create_prop_form__submit_text}>
              Only the Optimism Foundation manager address can create proposals
              for the time being.
            </p>
            <SubmitButton formTarget={formTarget} form={form} />
          </HStack>
        </VStack>
      </form>
    </VStack>
  );
}
