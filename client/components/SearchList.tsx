import * as React from 'react';
import { Program} from '../reducers/reducer'
import {showSearch} from '../actions/app2'
import { Icon, Dropdown} from 'semantic-ui-react'



const SearchList = (props:any) =>(
    <div>
        {(()=>{

            this.resolveDisplayName = (key:string) =>{
                if(props.userChannels == undefined){
                    return "undefined!"
                }
                for (var i=0;i<props.userChannels.length;i++){
                    if(props.userChannels[i].ID == key){
                        return props.userChannels[i].DisplayName
                    }
                }
                return "undefined!!"
            }                                

            if(this.searchWords==undefined){
                this.searchWords=""
            }
            
            
            /* filter search word */
            var programsSearched:Program[]=[]
            if(this.searchWords!=""){
                this.searchWords.split(" ").map(
                    (word:string)=>{
                        console.log(word)
                        props.tvPrograms.map(
                            (pr:Program)=>{
                                if(pr.Title.indexOf(word)>=0 || pr.Desc.indexOf(word)>0) {
                                    programsSearched.push(pr)
                                }
                            }
                        )
                    }
                )
            }else{

            }

            /*sort filtered programs*/
            programsSearched.sort((a,b)=>{
                if(a.Start < b.Start) return -1
                if(a.Start > b.Start) return 1
                return 0;
            })



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
                    <Icon name='search' />
                    <Dropdown
                            options={this.predifinedSearchWords}
                            placeholder='search...'
                            search
                            selection
                            allowAdditions
                            additionLabel='additional word: '
                            // value={currentValue}
                            onAddItem={this.handleAddition}
                            onChange={(proxy:any, e:any) => {console.log(proxy);console.log(e);this.searchWords=e.value;props.dispatch(showSearch()) }}
                        />



                    {
                        programsSearched.map(
                            (pr:Program) =>{
                                var startYear=pr.Start.substr(0,4)
                                var startMonth=pr.Start.substr(4,2)
                                var startDay=pr.Start.substr(6,2)
                                var startHour=pr.Start.substr(8,2)
                                var startMin=pr.Start.substr(10,2)
                            
                                // var stopYear=pr.Stop.substr(0,4)
                                // var stopMonth=pr.Stop.substr(4,2)
                                // var stopDay=pr.Stop.substr(6,2)
                                var stopHour=pr.Stop.substr(8,2)
                                var stopMin=pr.Stop.substr(10,2)


                                var inRecorderTimers: boolean = false
                                props.recorderTimers.map(
                                    (item:Program)=>{
                                        if (item.key == pr.key){
                                            inRecorderTimers = true
                                        }
                                    }
                                )

                                if(inRecorderTimers){
                                    var messageStyle="ui orange message"
                                }else{
                                    var messageStyle="ui olive message"
                                }

                                return(
                                    <div className={messageStyle}>
                                        <div className="item">
                                            <div className="content">
                                                <a className="header" onClick={e => props.onClick_toggleRecorderTimers(pr, inRecorderTimers ) } >
                                                    {pr.Title} 
                                                    {this.resolveDisplayName(pr.Channel)}
                                                </a>
                                                <div className="meta">
                                                    {startYear} {startMonth}/{startDay} {startHour}:{startMin} - {stopHour}:{stopMin}
                                                </div>
                                                <div className="description">
                                                    {pr.Desc}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            )
        })()}
    </div>
)


export default SearchList;

