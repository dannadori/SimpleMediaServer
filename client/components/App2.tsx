import * as React from 'react';
import { Button, Icon} from 'semantic-ui-react'
import ChannelList from './ChannelList'
import ProgramList from './ProgramList'
import VideoList from './VideoList'
import SearchList from './SearchList'
import KeywordEditor from './KeywordEditor'

// import {getTVChannels, getTVPrograms, getUserChannels, getRecorderTimers} from '../actions/app'
// import {showProgram, showChannel, showVideo, showSearch, refreshAll} from '../actions/app2'

const ViewMode={
    PROGRAM: Symbol(),
    CHANNEL: Symbol(),
    VIDEO: Symbol(),
    SEARCH: Symbol(),
    KEYWORD: Symbol(),
}


const App2 = (props: any )=>(
<div>
    {
        (()=>{
            if(this.viewMode == undefined){
                this.viewMode=ViewMode.PROGRAM;
            }
            return(
                <div >
                    <div style={{transform:"scale(0.7,0.7)",transformOrigin:"0px 0px"}}>
                        <Button icon labelPosition='left' onClick={()=>{this.viewMode=ViewMode.PROGRAM;props.onClick_showProgram()}} >
                            <Icon name='calendar' />
                            Program
                        </Button>
                        <Button icon labelPosition='left' onClick={()=>{this.viewMode=ViewMode.CHANNEL;props.onClick_showChannel()}} >
                            <Icon name='feed' />
                            Channel
                        </Button>
                        <Button icon labelPosition='left' onClick={()=>{this.viewMode=ViewMode.VIDEO;props.onClick_showVideo()}} >
                            <Icon name='video' />
                            Video
                        </Button>
                        <Button icon labelPosition='left' onClick={()=>{this.viewMode=ViewMode.SEARCH;props.onClick_showSearch()}} >
                            <Icon name='search' />
                            Search
                        </Button>
                        <Button icon labelPosition='left' onClick={()=>{props.onClick_refreshAll()}} >
                            <Icon name='refresh' />
                            Refresh
                        </Button>
                        <Button icon labelPosition='left' onClick={()=>{props.onClick_postTVProgramsUpdate()}} >
                            <Icon name='refresh' />
                            PostProgramsUpdate
                        </Button>
                        
                        <Button icon labelPosition='left' onClick={()=>{props.onClick_getTVProgramsUpdate()}} >
                            <Icon name='refresh' />
                            GetProgramsUpdate
                        </Button>
                        <Button icon labelPosition='left' onClick={()=>{this.viewMode=ViewMode.KEYWORD;props.onClick_showKeywordEditor()}} >
                            <Icon name='refresh' />
                            Keywords
                        </Button>
                    </div>
    
                    <div>
                        {(()=>{
                            if(this.viewMode==ViewMode.PROGRAM){
                                return <ProgramList  {...props} />
                            }
                        })()}
        
                        {(()=>{
                            if(this.viewMode==ViewMode.CHANNEL){
                                return <ChannelList {...props}/>
                            }
                        })()}
        
                        {(()=>{
                            if(this.viewMode==ViewMode.VIDEO){
                                return <VideoList {...props}/>
                            }
                        })()}
                        
                        {(()=>{
                            if(this.viewMode==ViewMode.SEARCH){
                                return <SearchList {...props}/>
                            }
                        })()}

                        {(()=>{
                            if(this.viewMode==ViewMode.KEYWORD){
                                return <KeywordEditor {...props}/>
                            }
                        })()}
                    </div>
                    
                </div>
            )
        })()
    }
</div>

)




export default App2;
