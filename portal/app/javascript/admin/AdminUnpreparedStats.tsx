import { AdminApiClient } from "./AdminApiClient";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { ErrorMessage } from "../ErrorMessage";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";
import type {
  GetDiscordStatsResponse_DiscordNotJoinedTeam,
  GetSSHKeyStatsResponse_SSHKeyUnregisteredTeam,
} from "../../../proto/isuxportal/services/admin/unprepared_stats_pb";
import type { Team } from "../../../proto/isuxportal/resources/team_pb";

export interface Props {
  session: GetCurrentSessionResponse;
  client: AdminApiClient;
}

export const AdminUnpreparedStats = (props: Props) => {
  const [sshKeyStats, setSshKeyStats] = useState<GetSSHKeyStatsResponse_SSHKeyUnregisteredTeam[]>([]);
  const [sshKeyStatsError, setSshKeyStatsError] = useState<Error>();
  useEffect(() => {
    props.client
      .getSSHKeyStats()
      .then((resp) => {
        setSshKeyStats(resp.items);
      })
      .catch((e) => {
        setSshKeyStatsError(e);
      });
  }, []);
  const sshKeyStatsMessage = useMemo(
    () =>
      sshKeyStats
        .map(({ team, unregisteredMemberIds }) => {
          const membersWithoutSshKeys = unregisteredMemberIds.map((memberId) => {
            const member = team!.members.find((m) => m.id === memberId)!;
            return `${member.name} (#${member.id}, @${member.detail?.githubLogin}, ${member.detail?.discordTag})`;
          });
          return `${team!.name} (#${team!.id}): ${unregisteredMemberIds.length === team!.memberIds.length ? "*全員無登録*" : ""} ${membersWithoutSshKeys.join(", ")}`;
        })
        .join("\n"),
    [sshKeyStats],
  );

  const [discordStats, setDiscordStats] = useState<GetDiscordStatsResponse_DiscordNotJoinedTeam[]>([]);
  const [discordStatsError, setDiscordStatsError] = useState<Error>();
  useEffect(() => {
    props.client
      .getDiscordStats()
      .then((resp) => {
        setDiscordStats(resp.items);
      })
      .catch((e) => {
        setDiscordStatsError(e);
      });
  }, []);
  const discordStatsMessage = useMemo(
    () =>
      discordStats
        .map(({ team, notJoinedMemberIds }) => {
          const membersNotGuildMember = notJoinedMemberIds.map((memberId) => {
            const member = team!.members.find((m) => m.id === memberId)!;
            return `${member.name} (#${member.id}, @${member.detail?.githubLogin}, ${member.detail?.discordTag})`;
          });
          return `${team!.name} (#${team!.id}): ${notJoinedMemberIds.length === team!.memberIds.length ? "*全員未参加*" : ""} ${membersNotGuildMember.join(", ")}`;
        })
        .join("\n"),
    [discordStats],
  );

  const [envCheckStats, setEnvCheckStats] = useState<Team[]>([]);
  const [envCheckStatsError, setEnvCheckStatsError] = useState<Error>();
  useEffect(() => {
    props.client
      .getEnvCheckStats()
      .then((resp) => {
        setEnvCheckStats(resp.items);
      })
      .catch((e) => {
        setEnvCheckStatsError(e);
      });
  }, []);
  const envCheckStatsMessage = useMemo(
    () =>
      envCheckStats
        .map((team) => {
          return `${team.name} (#${team.id})`;
        })
        .join("\n"),
    [envCheckStats],
  );

  return (
    <>
      <header>
        <h1 className="title is-1">準備の完了していないチーム</h1>
      </header>
      <main>
        <UnpreparedStatsItem
          title="SSH鍵未登録"
          items={sshKeyStats}
          error={sshKeyStatsError}
          message={sshKeyStatsMessage}
        />
        <UnpreparedStatsItem
          title="Discordサーバー未参加"
          items={discordStats}
          error={discordStatsError}
          message={discordStatsMessage}
        />
        <UnpreparedStatsItem
          title="環境チェック未完了"
          items={envCheckStats}
          error={envCheckStatsError}
          message={envCheckStatsMessage}
        />
      </main>
    </>
  );
};

const UnpreparedStatsItem = <T,>({
  title,
  items,
  error,
  message,
}: {
  title: string;
  items: T[];
  error: Error | undefined;
  message: string;
}) => {
  const onFocus = useCallback((e) => {
    e.currentTarget.select();
  }, []);

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  return (
    <div className="block">
      <h2 className="title is-2">{title}</h2>
      {errorMessage}
      <div>未完了チーム数: {items.length}</div>
      <textarea className="textarea" value={message} readOnly onFocus={onFocus}></textarea>
    </div>
  );
};
