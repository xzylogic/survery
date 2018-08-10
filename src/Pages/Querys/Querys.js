import React from 'react';
import Query from './Query/Query'

class Querys extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      querys : null
    }
  }
  componentDidMount() {
    fetch('../questions.json')
        .then(res => res.json())
        .then(data => {this.setState({querys:data})})
        .catch(e => {console.log(e)});
  }
  render() {
    let id=parseInt(this.props.match.params.id);
    let percent = Math.round(parseFloat(id / 56 * 100));
    document.title = `已完成 ${percent}%`;
      return (
          <div>
            { this.state.querys==null ? null : <Query query={this.state.querys} id={id} percent={percent}/> }
          </div>
      )
  }
}

export default Querys;
