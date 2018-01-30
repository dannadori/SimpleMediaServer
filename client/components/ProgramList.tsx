import * as React from 'react';
import { Program,} from '../reducers/reducer'
import { Icon, Popup, Select,Dropdown} from 'semantic-ui-react'
import {showProgram} from '../actions/app2'



//const ProgramColumn = ({ props, programs, targetDate, index,  searchWords, channel, onClick_toggleRecorderTimers }) => (
const ProgramColumn = (params:any ) => {
    var props = params.props
    var programs = params.programs
    var targetDate = params.targetDate
    var index = params.index
    var searchWords = params.searchWords
    var channel = params.channel
    var onClick_toggleRecorderTimers=params.onClick_toggleRecorderTimers
    return(
        <div>
            {
                (()=>{
                    programs.sort((a:Program,b:Program)=>{
                        if(a.Start < b.Start) return -1
                        if(a.Start > b.Start) return 1
                        return 0;
                    })        
                })()
            }
            {programs.map(
                (program:Program)=>{
                    var inRecorderTimers: boolean = false
                    for (var i = 0; i < props.recorderTimers.length; i++) {
                        if (props.recorderTimers[i].key == program.key){
                            inRecorderTimers = true
                        }
                    }

                    var matchSerachWords:boolean=false
                    if(searchWords!=""){
                        searchWords.split(" ").map(
                            (word:string)=>{
                                if(program.Title.indexOf(word)>=0 || program.Desc.indexOf(word)>0) {
                                    matchSerachWords=true
                                }
                            }
                        )
                    }
                
                    if(inRecorderTimers==true){
                        var color:string="orange"
                    }else if(matchSerachWords){
                        var color:string="yellow"
                    }else{
                        var color:string="#edffe2"
                    }
                
                    var timeFrame:string=program.Start.substr(4,2) + "/" + program.Start.substr(6,2) + "  " + program.Start.substr(8,2) + ":" + program.Start.substr(10,2)
                                                + " - " + program.Stop.substr(8,2) + ":" + program.Stop.substr(10,2)
                
                    if (program.Start.indexOf(targetDate) < 0 && program.Stop.indexOf(targetDate) >= 0){
                        var startHour:string="00"
                        var startMin:string="00"
                
                        var stopHour:string=program.Stop.substr(8,2)
                        var stopMin:string=program.Stop.substr(10,2)
                    }else if(program.Start.indexOf(targetDate) >= 0 && program.Stop.indexOf(targetDate) >= 0){
                        var startHour:string=program.Start.substr(8,2)
                        var startMin:string=program.Start.substr(10,2)
                
                        var stopHour:string=program.Stop.substr(8,2)
                        var stopMin:string=program.Stop.substr(10,2)
                        
                    }else{
                        var startHour:string=program.Start.substr(8,2)
                        var startMin:string=program.Start.substr(10,2)
                        
                        var stopHour:string="23"
                        var stopMin:string="60"
                    }
                
                
                    var start_y=(Number(startHour)*60+Number(startMin))*3
                    var end_y=(Number(stopHour)*60+Number(stopMin))*3
                    var box_height_s=""+(end_y-start_y)+"px"
                    var box_top_s=(40+start_y)+"px"
                
                    var box_left=20+20+index*100
                    return(
                        <div style={{position:"relative"}}  >
                            <div className="ui label" style={{fontSize:"60%",backgroundColor:color,border:"inset",
                            borderWidth:"1px", borderCollapse:"gray",position:"absolute",top:box_top_s,left:box_left,height:box_height_s,width:"100px"}}>
                                <div className="ui header" onClick={e => onClick_toggleRecorderTimers(program, inRecorderTimers ) } >
                                    <Popup trigger={<Icon name='expand' style={{fontSize:"60%"}}/>} >
                                        <div className="ui header" >
                                            {program.Title}
                                        </div>
                                        {timeFrame} ({channel})
                                        <hr/>
                                        {program.Desc}
                                    </Popup>
                
                                    {program.Title}
                                </div>
                                <div className="ui">
                                    {timeFrame}
                                </div>
                                <hr />
                            </div>
                        </div>
                    )
                }
            )}
        </div>
    )
}
    


const ProgramList = (props:any) =>(
    <div>
    {
        (()=>{
            /*  */
            if(this.offset==undefined){
                this.offset=0
            }
            if(this.offset < 0){
                this.offset=0
            }
            if(this.dateOffset==undefined){
                this.dateOffset=0
            }
            if(this.searchWords==undefined){
                this.searchWords=""
            }

            this.resolveDisplayName = (key:string) =>{
                for (var i=0;i<props.tvChannels.length;i++){
                    if(props.tvChannels[i].ID == key){
                        return props.tvChannels[i].DisplayName
                    }
                }
                return "undefined!!"
            }

            /* Display target Date */
            var dt = new Date();
            dt.setDate(dt.getDate() + this.dateOffset);
            var year = dt.getFullYear();
            var month = ("00"+(dt.getMonth()+1)).slice(-2);
            var date = ("00"+dt.getDate()).slice(-2);
            var targetDate:string=""+year+""+month+""+date

            /* Target Channel ID */
            var targetChannelIDs:string[]=[]
            for(var i in props.tvChannels){
                if (this.targetCategory == undefined || this.targetCategory == "all"){
                    targetChannelIDs.push(props.tvChannels[i].ID)
                }else{
                    for(var j in props.tvChannels[i].tags){
                        if(props.tvChannels[i].tags[j] == this.targetCategory){
                            targetChannelIDs.push(props.tvChannels[i].ID)
                        }
                    }
                }
            }

            /* Key of Program per Channel. In this case key is ID of Channenl  */
            var programsPerChannel:{[key:string]:Program[]}={}
            var channelPerPage=12
            for (var index=this.offset; index < Math.min(channelPerPage+this.offset, targetChannelIDs.length ) ; index++){
                programsPerChannel[targetChannelIDs[index]]=[]
            }


            /* Date in program  and  Program per Channel. Program is filtered by target date */
            props.tvPrograms.map(
                (p:Program) => {
                    if(p.Start.indexOf(targetDate) >= 0 || p.Stop.indexOf(targetDate) >= 0 ){
                        if(p.Channel in programsPerChannel){
                            programsPerChannel[p.Channel].push(p)
                        }
                    }
                }
            )
            
            /* programs per column(channel) (Dictionary to Array)*/
            var programsPerColumn:Program[][]=[]
            var channelsPerColumn:string[]=[]
            
            for(var key in programsPerChannel){
                programsPerColumn.push(programsPerChannel[key])
                channelsPerColumn.push(key)
            }


            var channelNum=programsPerColumn.length
            
            var categories = [ {key:"all", value:"all", text:"all"}]
            for(var key in props.tags){
                if(props.tags[key].Category == "Tags For Channels"){
                    var category={key:props.tags[key].TagName, value:props.tags[key].TagName, text:props.tags[key].TagName}
                    categories.push(category)
                }
            }

            this.changeCategory = (proxy:any, e:any)=>{
                this.targetCategory=e.value
                props.onClick_refreshScreen()
            }


            this.predifinedSearchWords = [ ]
            for(var key in props.tags){
                if(props.tags[key].Category == "Frequently used search word"){
                    var word={key:props.tags[key].TagName, value:props.tags[key].TagName, text:props.tags[key].TagName}
                    this.predifinedSearchWords.push(word)
                }
            }
            this.handleAddition= (proxy:any,e:any)=>{ 
                var word={key:e.value, value:e.value, text:e.value}
                this.predifinedSearchWords.push(word)
            }

            
            return (
                <div>
                    <div>
                        <Icon name='arrow left' onClick={()=>{this.dateOffset--;props.dispatch(showProgram())}}/>
                        {year} {month}/{date}
                        <Icon name='arrow right' onClick={()=>{this.dateOffset++;props.dispatch(showProgram())}}/>
                        <Select placeholder='Select category' options={categories} onChange={this.changeCategory} />
                        {/* <div className="ui input">
                            <input type="text" placeholder="Search..." onChange={(e) => {this.searchWords=e.target.value;props.dispatch(showProgram()) }} />
                        </div> */}

                        <Dropdown
                            options={this.predifinedSearchWords}
                            placeholder='search...'
                            search
                            selection
                            allowAdditions
                            additionLabel='additional word: '
                            // value={currentValue}
                            onAddItem={this.handleAddition}
                            onChange={(proxy:any, e:any) => {console.log(proxy);console.log(e);this.searchWords=e.value;props.dispatch(showProgram()) }}
                        />

                    </div>
                    <div style={{height:"80vh",width:"100%",overflowX:"scroll"}}>
                        <div style={{borderWidth:"1px",borderStyle:"solid",
                                    width:20+20+channelNum*100+20+20+"px",
                                    height:20+20+60*3*24+20+20+"px",position:"relative",overflowY:"hidden",overflowX:"hidden"}}>
                            <div style={{width:20+"px",height:20+"px",position:"absolute",top:0+"px",left:20+"px"}}> 
                                <Icon name='chevron left' onClick={()=>{this.offset--;props.dispatch(showProgram())}}/>
                            </div>
                            <div style={{width:20+"px",height:20+"px",position:"absolute",top:0+"px",left:20+20+channelNum*100+"px"}}> 
                                <Icon name='chevron right' onClick={()=>{this.offset++;props.dispatch(showProgram())}}/>
                            </div>
                            <div style={{width:20+"px",height:20+"px",position:"absolute",top:20+"px",left:0+"px"}}> 
                                <Icon name='chevron up' onClick={()=>{this.offset--;props.dispatch(showProgram())}}/>
                            </div>
                            <div style={{width:20+"px",height:20+"px",position:"absolute",top:20+"px",left:20+20+channelNum*100+20+"px"}}> 
                                <Icon name='chevron down' onClick={()=>{this.offset--;props.dispatch(showProgram())}}/>
                            </div>
                            {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map(
                                (x:number)=>{
                                    return(
                                        <div style={{width:40+"px",height:60*3+"px",backgroundColor:"white",borderWidth:"1px",borderStyle:"solid",
                                            position:"absolute",top:40+60*3*x+"px",left:0+"px"}}> 
                                            {x}
                                        </div>
                                    )
                                }
                            )}
                            {channelsPerColumn.map(
                                (ch:string,index:number)=>{
                                    var channel:string = this.resolveDisplayName(ch)
                                    return(
                                        <div style={{width:100+"px",height:40+"px",backgroundColor:"#c4f7a5",borderColor:"#3f910d",borderWidth:"1px",borderStyle:"outset",
                                            position:"absolute",top:0+"px",left:20+20+index*100+"px"}}>
                                                {channel}
                                        </div>
                                    )
                                }
                            )}

                            {programsPerColumn.map(
                                (prs:Program[],index:number)=>{
                                    if(prs.length==0){
                                        return ""
                                    }
                                    var channel:string = this.resolveDisplayName(prs[0].Channel)
                                    return (<ProgramColumn props={props} programs={prs} targetDate={targetDate} index={index} 
                                        searchWords={this.searchWords} channel={channel}
                                        onClick_toggleRecorderTimers={props.onClick_toggleRecorderTimers} />)
                                }
                            )}
                            {programsPerColumn.map(
                                (prs:Program[],index:number)=>{
                                    if(prs.length==0){
                                        return ""
                                    }
                                    var channel:string = this.resolveDisplayName(prs[0].Channel)
                                    return(
                                        <div style={{width:100+"px",height:40+"px",backgroundColor:"white",borderWidth:"1px",borderStyle:"solid",
                                            position:"absolute",top:40+60*3*24+"px",left:20+20+index*100+"px"}}>
                                                {channel}
                                        </div>
                                    )
                                }
                            )}


                        </div>

                    </div>
                    <div>
                        <Icon name='arrow left' onClick={()=>{this.dateOffset--;props.dispatch(showProgram())}}/>
                        {year} {month}/{date}
                        <Icon name='arrow right' onClick={()=>{this.dateOffset++;props.dispatch(showProgram())}}/>
                    </div>

                </div>

            )
        })()
    }
    </div>
)

export default ProgramList;

