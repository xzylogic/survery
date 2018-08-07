import React from 'react';
import Query from './Query/Query'

class Querys extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render() {
      return (
          <Query query={this.props.querys}/>
      )
    // return this.props.querys.map((query,index) => {
    //   return (
    //     <Query
    //         id={query.id}
    //         title={query.title}
    //         content={query.content}
    //         order={query.order}
    //         key={index}
    //     />
    //   )
    // })
  }
}

export default Querys;
