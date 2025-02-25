"use client";

// TODO: handle delegatesVotesType to show snapshot delegateVotes

import { Listbox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ChevronDown } from "lucide-react";

const delegatesVotesType = {
  all: { value: "Show all" },
  snapshot: { value: "Snapshot" },
  onchain: { value: "Onchain" },
};

export default function DelegatesVotesType() {
  const [selected, setSelected] = useState("all");

  return (
    <Listbox as="div" value={selected} onChange={setSelected}>
      {() => (
        <>
          <Listbox.Button className="w-full md:w-fit bg-[#F7F7F7] text-base font-medium border-none rounded-full py-2 px-4 flex items-center">
            {delegatesVotesType[selected].value}
            <ChevronDown className="h-4 w-4 ml-[2px] opacity-30 hover:opacity-100" />
          </Listbox.Button>
          <Listbox.Options className="mt-3 absolute right-4 md:right-auto bg-[#F7F7F7] border border-[#ebebeb] p-2 rounded-[1rem] flex flex-col gap-1">
            {Object.entries(delegatesVotesType).map(([key, option]) => (
              <Listbox.Option key={key} value={key} as={Fragment}>
                {({ selected }) => {
                  return (
                    <li
                      className={`cursor-pointer text-base py-2 px-3 border rounded-xl font-medium ${
                        selected
                          ? "text-black bg-white border-[#ebebeb]"
                          : "text-[#66676b] border-transparent"
                      }`}
                    >
                      {option.value}
                    </li>
                  );
                }}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
}
