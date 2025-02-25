import { useAccount, useBalance, useContractWrite } from "wagmi";
import { ArrowDownIcon } from "@heroicons/react/20/solid";
import { VStack } from "@/components/Layout/Stack";
import { OptimismContracts } from "@/lib/contracts/contracts";
import ENSName from "@/components/shared/ENSName";
import { DelegationDisplayAmount } from "./DelegationDisplayAmount";
import { Button } from "@/components/Button";
import styles from "./delegateDialog.module.scss";
import { useModal } from "connectkit";
import { Button as ShadcnButton } from "@/components/ui/button";

export function DelegateDialog({
  target,
  votingPower,
  completeDelegation,
}: {
  target: string;
  votingPower: string;
  completeDelegation: () => void;
}) {
  const { address: accountAddress } = useAccount();
  const { setOpen } = useModal();
  const { data: balance } = useBalance({
    address: accountAddress,
    token: OptimismContracts.token.address as any,
  });

  const { isLoading, isSuccess, isError, write } = useContractWrite({
    address: OptimismContracts.token.address as any,
    abi: OptimismContracts.token.abi,
    functionName: "delegate",
    args: [target as any],
  });
  return (
    <VStack alignItems="items-center" className={styles.dialog_container}>
      <VStack gap={6} alignItems="items-stretch">
        <VStack
          gap={3}
          alignItems="items-center"
          className={styles.details_container}
        >
          <VStack
            className={styles.amount_container}
            alignItems="items-center"
            gap={3}
          >
            {(() => {
              if (!balance) {
                return <div>{`You don't have any tokens to delegate`}</div>;
              }
              return (
                <>
                  <div>Delegating your</div>

                  <DelegationDisplayAmount amount={balance.value} />
                </>
              );
            })()}
          </VStack>

          <VStack
            className={styles.transfer_symbol_container}
            alignItems="items-center"
          >
            <VStack
              justifyContent="justify-center"
              className={styles.circle_container}
            >
              <div className={styles.circle} />
            </VStack>

            <VStack className={styles.arrow_container}>
              <ArrowDownIcon className="text-black" />
            </VStack>
          </VStack>

          <VStack className={styles.amount_container}>
            <div className="text-center">
              To <ENSName address={target} /> who represents
            </div>

            <DelegationDisplayAmount amount={votingPower} />
          </VStack>
        </VStack>
        {!accountAddress && (
          <ShadcnButton variant="outline" onClick={() => setOpen(true)}>
            Connect wallet to vote
          </ShadcnButton>
        )}
        {isLoading && (
          <Button disabled={false}>Submitting your delegation...</Button>
        )}
        {isSuccess && <Button disabled={false}>Delegation completed!</Button>}
        {isError && (
          <Button disabled={false} onClick={() => write()}>
            Delegation failed - try again
          </Button>
        )}
        {!isError && !isSuccess && !isLoading && accountAddress && (
          <Button disabled={false} onClick={() => write()}>
            Delegate your votes
          </Button>
        )}
      </VStack>
    </VStack>
  );
}
