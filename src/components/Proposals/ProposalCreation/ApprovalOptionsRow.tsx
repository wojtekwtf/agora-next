"use client";

import { Form } from "./CreateProposalForm";
import { XCircleIcon } from "@heroicons/react/20/solid";
import styles from "./styles.module.scss";
import { VStack } from "@/components/Layout/Stack";
import InputBox from "@/components/shared/InputBox";
import AddTransactionsDetails from "./AddTransactionsDetails";

export default function ApprovalOptionsRow({ form }: { form: Form }) {
  function addOption() {
    form.onChange.options([
      ...form.state.options,
      {
        title: "",
        transactions: [],
      },
    ]);
  }

  function update(index: number, next: Partial<Form["state"]["options"][0]>) {
    form.onChange.options(
      form.state.options.map((option, i) => {
        if (i === index) {
          return {
            ...option,
            ...next,
          };
        }
        return option;
      })
    );
  }

  function remove(index: number) {
    form.onChange.options(form.state.options.filter((_, i) => i !== index));
  }

  return (
    <>
      <h4 className={styles.create_prop_form__title}>Proposed Options</h4>
      <p className={styles.approval__option_row_text}>
        Proposed transactions will execute if your proposal passes. If you skip
        this step no transactions will be added.
      </p>
      {form.state.options.map((_option, index) => (
        <VStack gap={4} key={index} className={styles.approval__option_row}>
          <div className={styles.approval__option_title}>
            Option {index + 1}
          </div>
          <VStack>
            <label className={styles.create_prop_form__label}>Title</label>
            <InputBox
              placeholder={"My option title"}
              value={form.state.options[index].title}
              onChange={(next) => update(index, { title: next })}
              required
            />
            <AddTransactionsDetails optionIndex={index} form={form} />
          </VStack>
          {form.state.options.length > 1 && (
            <XCircleIcon
              className={styles.transaction_details_option__remove}
              onClick={() => remove(index)}
            />
          )}
        </VStack>
      ))}
      <div onClick={addOption} className={styles.option_button}>
        <div className={styles.option_button__add}>+</div>
        <div className={styles.option_button__copy}>Add option</div>
      </div>
    </>
  );
}
