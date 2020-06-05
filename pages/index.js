import React, { Component } from "react";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      components: []
    };
  }

  addComponent = async type => {
    console.log("Step :: 2")
    console.log(`Loading ${type} component...`);

    import(`./components/${type}.js`)
      .then(component => {
        console.log(component.default)
        this.setState({
          components: this.state.components.concat(component.default)
        })
      }
      )
      .catch(error => {
        console.error(`"${type}" not yet supported`);
      });
  };

  async componentDidMount() {
    const { events } = this.props;
    console.log("Step :: 1")
    console.log(events)
    events.map(async type => await this.addComponent(type));
    //push array // into addComponent
    // ["PushEvent", "PushEvent", "PushEvent", "ReleaseEvent", "StatusEvent", "BadEvent"]
  }

  render() {
    const { components } = this.state;
    console.log("Step :: 3")
    console.log(components)

    if (components.length === 0) return <div>Loading...</div>;

    const componentsElements = components.map(Component => (
      <Component />
    ));
    console.log("Step :: 4")
    console.log(componentsElements)
    return <div>{componentsElements}</div>;
  }
}

export default Index;


// 0955059945
// บ้านพี่เพียช



























// import React, { useContext, useState } from 'react'
// import TestStore3 from '../mobx-store/TestStore3'
// import { observer } from 'mobx-react'
// import Link from 'next/link'

// const index = observer(() => {
//   const [id, setId] = useState("")
//   const [password, setPassword] = useState("")

//   const context = useContext(TestStore3)

//   console.log("--- index ---")
//   console.log(context)

//   const _setProfile = () => {
//     if (id && password)
//       context.setProfile(id, password)
//     else alert("Invalid data")
//   }

//   return <div>
//     Test Screen 1
//     <h1>{context.id ? context.id : ""}</h1>
//     <h1>{context.password ? context.password : ""}</h1>

//     <input value={id} onChange={(e) => setId(e.target.value)} />
//     <input value={password} onChange={(e) => setPassword(e.target.value)} />
//     <button onClick={() => _setProfile()}>Set Profile</button>

//     <Link href="/dashboard"><a><h1> Go To Dashboard</h1></a></Link>
//   </div >
// })

// export default index




