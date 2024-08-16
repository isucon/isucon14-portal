import { ContestantInstance_Status } from "../../proto/isuxportal/resources/contestant_instance_pb";

import React from "react";

export interface Props {
  status: ContestantInstance_Status;
}

const COLORS = {
  [ContestantInstance_Status.UNKNOWN]: "light",
  [ContestantInstance_Status.PENDING]: "dark",
  [ContestantInstance_Status.MODIFYING]: "warning",
  [ContestantInstance_Status.RUNNING]: "success",
  [ContestantInstance_Status.STOPPED]: "danger",
  [ContestantInstance_Status.TERMINATED]: "danger",
} as const;

export const ContestantInstanceStatus: React.FC<Props> = (props: Props) => {
  const color = COLORS[props.status];

  return <span className={`tag is-${color}`}>{ContestantInstance_Status[props.status]}</span>;
};
