import React, { PureComponent } from "react";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      poke: []
    };
  }

  render() {
    return <div>HELLO WORLD!</div>;
  }
}

export default App;
