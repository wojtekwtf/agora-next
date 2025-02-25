"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { delegatesFilterOptions } from "@/lib/constants";
import { Listbox } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function DelegatesFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderByParam = searchParams.get("orderBy");
  const [selected, setSelected] = useState(orderByParam || "weightedRandom");

  useEffect(() => {
    const handleChanges = (value) => {
      value === "weightedRandom"
        ? router.push("/delegates")
        : router.push(`/delegates/?orderBy=${value}`);
    };

    handleChanges(selected);
  }, [router, selected]);

  return (
    <Listbox as="div" value={selected} onChange={setSelected}>
      {() => (
        <>
          <Listbox.Button className="w-full md:w-fit bg-[#F7F7F7] text-base font-medium border-none rounded-full py-2 px-4 flex items-center">
            {delegatesFilterOptions[selected]?.value || "Weighted Random"}
            <ChevronDown className="h-4 w-4 ml-[2px] opacity-30 hover:opacity-100" />
          </Listbox.Button>
          <Listbox.Options className="mt-3 absolute bg-[#F7F7F7] border border-[#ebebeb] p-2 rounded-[1rem] flex flex-col gap-1">
            {Object.entries(delegatesFilterOptions).map(([key, option]) => (
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
