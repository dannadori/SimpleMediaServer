import * as React from 'react';
import App2 from './App2'


class App extends React.Component{
    constructor (props:any){
        super(props)
        props.onClick_refreshAll()
    }
    render(){
        return(
            <div style={{width:"90%",margin:"0 auto"}}>
                <App2 {...this.props}/>
            </div>
        )
    }
}

export default App;

