import { useSignal } from "@preact/signals";
import { ListItem } from "../components/List.tsx";
import clsx from "npm:clsx";
import { FullRecord } from "../type/record.ts";
import { recordTypeEmoji } from "../const/record_type.ts";
import { RecordType } from "../const/record_type.ts";
import { cloneDeep } from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

import { IS_BROWSER } from "$fresh/runtime.ts";

interface RecordTypeSelectorProps {
  value: RecordType;
  onChange: (value: RecordType) => void;
}
function RecordTypeSelector(props: RecordTypeSelectorProps) {
  if (!IS_BROWSER) return <div></div>;
  return (
    <div className={"group relative"}>
      <div className={"text-3xl relative z-0"}>
        {recordTypeEmoji[props.value]}
      </div>
      <div
        className={
          "hidden group-hover:grid grid-cols-4 w-48 absolute border p-2 z-10 rounded-lg bg-white"
        }
      >
        {Object.entries(recordTypeEmoji).map(([key, value]) => {
          return (
            <div
              className={clsx(
                "text-3xl hover:bg-gray-100 p-1 px-2 rounded cursor-pointer"
              )}
              onClick={() => props.onChange(key as RecordType)}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface RecordItemProps {
  record: FullRecord;
}
export default function RecordItem(props: RecordItemProps) {
  if (!IS_BROWSER) return <div></div>;
  const record = useSignal<FullRecord>(cloneDeep(props.record));
  const handleChangeType = async (value: FullRecord) => {
    fetch("/app/api/record", {
      method: "PUT",
      body: JSON.stringify({
        id: value.id,
        updatedRecord: {
          type: value.type,
        },
      }),
    });
  }
  return (
    <ListItem className={"flex border p-2 rounded-lg items-center space-x-2"}>
      <RecordTypeSelector
        value={record.value.type}
        onChange={(value) => {
          record.value = {
            ...record.value,
            type: value,
          };
          handleChangeType(record.value);
        }}
      />
      <div className={"flex-1 flex items-center space-x-2"}>
        <div className="flex flex-col">
          <div className={"text-gray-500 text-xs"}>{record.value.time}</div>
        </div>
        <div className={"text-gray-500 mt-2"}>{record.value.note}</div>
      </div>
      <div className={"flex items-end flex-col"}>
        <div className={"text-xs"}>
          <span>Balance:</span>
          <span>{record.value.balance}</span>
        </div>
        <div className={"mr-2"}>{record.value.account_name}</div>
      </div>
      <div
        className={clsx(
          "flex items-center p-1 text-lg rounded w-12 justify-center",
          {
            "bg-green-100 text-green-500": record.value.direction === "income",
            "bg-red-100 text-red-500": record.value.direction === "expense",
          }
        )}
      >
        <div className={""}>
          {record.value.direction === "income" ? "+" : "-"}
        </div>
        <div>{record.value.amount}</div>
      </div>
    </ListItem>
  );
}
