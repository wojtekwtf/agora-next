import { Button } from "@/components/Button";
import Image from "next/image";
import successfulDelegation from "public/images/successfulDelegation.svg";

// TODO: Add notion link in "Learn more"

export function SuccessView({ closeDialog }: { closeDialog: () => void }) {
  return (
    <div>
      <div className="w-full">
        <Image
          className="w-full"
          src={successfulDelegation}
          alt="Delegation successful image"
        />
      </div>

      <h1 className="font-extrabold text-2xl mt-4 mb-2">
        You&apos;ve delegated your votes!
      </h1>
      <p className="text-gray-700">
        It might take up to a minute for the changes to be reflected. Actual
        amount of tokens delegated can be slightly different due to{" "}
        <a
          className="underline"
          href="https://argoagora.notion.site/Optimism-Agora-FAQ-3922ac9c66e54a21b5de16be9e0cf79c?pvs=4"
          target="_blank"
          rel="noopener noreferrer"
        >
          rounding
        </a>{" "}
        in calculation.
      </p>
      <Button className="w-full mt-6" onClick={() => closeDialog()}>
        Got it
      </Button>
    </div>
  );
}
