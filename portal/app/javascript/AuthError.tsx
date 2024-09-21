
import React from "react";


export interface Props {
}

export interface State {
}

export class AuthError extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }


  public render() {
    return (
      <>
        <main>
            <div className="message is-danger">
                <div className="message-body">連携に失敗しました</div>
            </div>
        </main>
      </>
    );
  }

}
