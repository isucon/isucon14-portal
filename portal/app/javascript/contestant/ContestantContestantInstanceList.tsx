import { ApiError, ApiClient } from "../ApiClient";

import React, { useEffect, useState } from "react";

import { ContestantInstanceStatus } from "../ContestantInstanceStatus";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";
import type { ContestantInstance } from "../../../proto/isuxportal/resources/contestant_instance_pb";

export interface Props {
  session: GetCurrentSessionResponse;
  client: ApiClient;
}

export const ContestantContestantInstanceList: React.FC<Props> = ({ session, client }) => {
  const [template, setTemplate] = useState("");
  useEffect(() => {
    (async () => {
      const res = await client.getCloudFormation();
      setTemplate(res.template);
    })();
  }, []);

  const templateBase64 = `data:text/plain,${encodeURIComponent(template)}`;

  const renderRow = (ci: ContestantInstance) => {
    return (
      <tr>
        <td>{ci.number.toString()}</td>
        <td>
          {ci.publicIpv4Address}
          <SmallCopyButton content={ci.publicIpv4Address} />
        </td>
        <td>
          {ci.privateIpv4Address}
          <SmallCopyButton content={ci.privateIpv4Address} />
        </td>
        <td>
          <ContestantInstanceStatus status={ci.status} />
        </td>
        <td>
          <code>ssh isucon@{ci.publicIpv4Address}</code>
          <SmallCopyButton content={`ssh isucon@${ci.publicIpv4Address}`} />
        </td>
      </tr>
    );
  };
  return (
    <>
      <header>
        <h1 className="title is-1">サーバーリスト</h1>
      </header>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Public IPv4</th>
            <th>Private IPv4</th>
            <th>Status</th>
            <th>SSH Command Example</th>
          </tr>
        </thead>

        <tbody>{(session.contestantInstances || []).map((ci) => renderRow(ci))}</tbody>
      </table>

      {true && (
        <>
          <header>
            <h1 className="title is-1">CloudFormation テンプレート</h1>
          </header>
          <p className="my-1">
            このテンプレートはチームごとに固有のものなので<b>共有厳禁</b>です。
          </p>
          <a
            className={`button is-info ${template === "" ? "is-loading" : ""}`}
            href={templateBase64}
            download="contest_cloudformation.yaml"
          >
            CloudFormation テンプレートをダウンロード
          </a>

          <article className="message mt-4">
            <div className="message-header">
              <p>ダウンロード後の手順</p>
            </div>
            <div className="message-body">
              <ol className="content ml-4">
                <li>
                  <a href="https://ap-northeast-1.console.aws.amazon.com/cloudformation/home?region=ap-northeast-1#/">
                    AWS マネジメントコンソールの CloudFormation
                  </a>{" "}
                  を開く。右上が「東京」(アジアパシフィック (東京) ap-northeast-1)になっていることを確認。
                </li>
                <li>「スタックを作成」をクリック。</li>
                <li>
                  「既存のテンプレートを選択」、「テンプレートファイルのアップロード」を指定し、ダウンロードしたテンプレートをアップロードする。
                </li>
                <li>
                  スタック名は任意のもの、それ以外の箇所は変更せずに画面にしたがって進める。最後の「AWS CloudFormation
                  によって IAM リソースが作成される場合があることを承認します。」に<b>チェックを入れた上で</b>
                  、「送信」をクリック。
                </li>
                <li>
                  「スタックの作成」を実行後から約5分後にインスタンスが起動し、このページのサーバーリストでインスタンスが確認できるようになります。
                </li>
              </ol>
            </div>
          </article>
        </>
      )}
    </>
  );
};

const SmallCopyButton = ({ content }: { content: string }) => {
  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await navigator.clipboard.writeText(content);
  };

  return (
    <button className="button is-small ml-2" onClick={onClick}>
      <span className="material-icons-outlined is-size-6">content_copy</span>
    </button>
  );
};
