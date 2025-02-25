import { HStack, VStack } from "@/components/Layout/Stack";
import ENSAvatar from "@/components/shared/ENSAvatar";
import HumanAddress from "@/components/shared/HumanAddress";
import { Input } from "@/components/ui/input";
import styles from "./advancedDelegateDialog.module.scss";
import { useEnsName } from "wagmi";
import { formatUnits } from "viem";
import { Dispatch, SetStateAction } from "react";

function SubdelegationToRow({
  to,
  setAllowance,
  availableBalance,
  allowances,
  index,
}: {
  to: string;
  setAllowance: Dispatch<SetStateAction<number[]>>;
  availableBalance: string;
  allowances: number[];
  index: number;
}) {
  const allowance = allowances[index];
  const { data } = useEnsName({
    chainId: 1,
    address: to as `0x${string}`,
  });
  const availableBalanceNumber = Number(
    formatUnits(BigInt(availableBalance), 18)
  );

  const sumOtherAllowances = allowances.reduce((sum, current, idx) => {
    return idx === index ? sum : sum + current;
  }, 0);

  const amountToAllocate = availableBalanceNumber - sumOtherAllowances;

  const percent =
    Number.isNaN(allowance) || allowance === 0
      ? 0
      : Math.round((allowance / availableBalanceNumber) * 100_00) / 100;

  return (
    <div className={styles.sub_row}>
      <HStack gap={3}>
        <div className={styles.avatar}>
          <ENSAvatar ensName={data} />
        </div>
        <VStack>
          <p className={styles.subtitle}>Delegated to</p>
          <div className={styles.address_to}>
            <HumanAddress address={to} />
          </div>
        </VStack>
      </HStack>
      <div className="relative">
        <Input
          value={allowance.toString()}
          className={styles.sub_row_input}
          onChange={(e) => {
            function formatNumber(value: number) {
              return Math.floor(Math.round(value * 1000) / 10) / 100;
            }

            const newAllowanceValue = parseFloat(
              e.target.value.replace(/,/g, "")
            );
            if (!isNaN(newAllowanceValue) && newAllowanceValue >= 0) {
              const newAllowances = [...allowances];
              newAllowances[index] =
                newAllowanceValue > amountToAllocate
                  ? formatNumber(amountToAllocate)
                  : formatNumber(newAllowanceValue);
              setAllowance(newAllowances);
            } else {
              const newAllowances = [...allowances];
              newAllowances[index] = 0;
              setAllowance(newAllowances);
            }
          }}
          type="number"
          min={0}
          max={amountToAllocate}
          step={0.01}
        />

        <div className={styles.sub_row_percent}>
          <p>OP</p>
          <div></div> <p>{percent}%</p>
        </div>
      </div>
    </div>
  );
}

export default SubdelegationToRow;
