import React from 'react';

class Header extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    let id = parseInt(this.props.id);
    id = id+1;//下一题
    let query_content=null;
    if(id === 112 || id ===114){
      query_content = <input type="text" className="inputText" defaultValue=""/>
    }else if(id === 113){
      query_content = (
          <div>
            <div className="female">
              <Link to={`/querys/${id}`}>
                <input type="radio" id="female" name="sex"/>
                <label htmlFor="female">女</label>
              </Link>
            </div>
            <div className="male">
              <Link to={`/querys/${id}`}>
                <input type="radio" id="male" name="sex"/>
                <label htmlFor="male">男</label>
              </Link>
            </div>
          </div>
      )
    }else if(id === 115){
      query_content = (
          <div>
            <input type="text"/>身高
          </div>
      )
    }else{
      query_content = (
          <div>
            {
              this.props.content.map((content,index) => {
                if(content === "" || content === null){
                  return null;
                }else{
                  return (
                      <div key={index}>
                        <input type="radio"/>{content}
                      </div>
                  )
                }
              })
            }
          </div>
      )
    }
    return (
        <div className="title">
          <div className="progress-container" style={{marginTop:'0.36rem',height:'0.36rem'}}>
            <Progress percent={percent} position="normal" style={{borderRadius:'1rem'}}/>
          </div>
          <p className="title_header">{this.props.query[id-112].title}</p>
          {query_content}
        </div>
    )
  }
}

export default Header;
