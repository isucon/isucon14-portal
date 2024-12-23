import { ApiClient } from "./ApiClient";
import React from "react";
import type { GetCurrentSessionResponse } from "../../proto/isuxportal/services/common/me_pb";
import { Contest_Status } from "../../proto/isuxportal/resources/contest_pb";

export interface Props {
  session: GetCurrentSessionResponse;
  client: ApiClient;
}

export interface State {}

export class Landing extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <>
        {this.renderHero()}
        {this.renderMain()}
      </>
    );
  }

  public renderHero() {
    return (
      <header className="hero">
        <div className="hero-body">
          <div className="isux-landing-logo-wrapper container has-text-centered">
            <img src="/isucon14_logo.png" />
          </div>
        </div>
      </header>
    );
  }

  public renderMain() {
    if (this.props.session.contestant) {
      return (
        <main>
          <p className="block">参加登録が完了しています。情報を修正したい場合は右上の「参加登録/修正」から行えます。</p>
        </main>
      );
    }

    if (this.props.session.contest?.status === Contest_Status.REGISTRATION) {
      return (
        <main>
          <p className="block">参加登録は右上から行えます</p>
          <p className="block">
            予選参加確定枠を利用される方は2024年10月10日以降、本登録開始となります。
            <br />
            個別にメールにて案内している手順を参照してください。
            <br />
            予選参加確定枠のチームメンバーは代表者の方から招待を受け取ってください。
          </p>
        </main>
      );
    } else {
      return (
        <main>
          <p className="block">現在は参加登録を受け付けていません</p>
          <p className="block">
            予選参加確定枠を利用される方は2024年10月10日以降、本登録開始となります。
            <br />
            個別にメールにて案内している手順を参照してください。
            <br />
            予選参加確定枠のチームメンバーは代表者の方から招待を受け取ってください。
          </p>
        </main>
      );
    }
  }
}
