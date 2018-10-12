import React from 'react'
import decorator from 'decorator'

@decorator
class App extends React.Component {
  render() {
    return (
      <div
           className="App" {...this.props} >
        App
            </div>
    )
  }
}

export default App
