import * as React from 'react';
import {Channel, Tag} from '../reducers/reducer'
import {Segment, Popup, Label} from 'semantic-ui-react'


const ChannelList = (props: any )=>(
<div>
    <div className="ui grid container">
        {props.tvChannels.map(
            (c:Channel)=>{

                return (
                        <div className="four wide column">
                            <div className="ui olive message">
                                <a className="header" >
                                    {c.DisplayName}
                                </a>
                                <div className="meta">
                                    {c.ID}
                                </div>
                                <Segment raised>
                                    {props.tags.map(
                                        (tag:Tag)=>{
                                            this.toggleTag=(c:Channel,tag:Tag)=>{
                                                var hasTag:boolean=false
                                                var newTags:string[]=[]
                                                for(var tagName in c.tags){
                                                    if(tag.TagName == c.tags[tagName]){
                                                        hasTag=true
                                                    }else{
                                                        newTags.push(c.tags[tagName])
                                                    }
                                                }
                                                if(hasTag==false){
                                                    newTags.push(tag.TagName)
                                                }
                                                c.tags=newTags
                                                props.updateChannelTags(c)
                                            }

                                            if(tag.Category == "Tags For Channels"){
                                                var color:any="grey"
                                                for(var t in c.tags){
                                                    if(tag.TagName == c.tags[t]){
                                                        color="orange"
                                                        break
                                                    }
                                                }
    
                                                return (
                                                    <Popup
                                                        trigger={(()=>{return (
                                                            <Label as='a' color={color} onClick={ (e)=>{this.toggleTag(c,tag)} } >{tag.TagName}</Label>
                                                        )})()}
                                                        // trigger={<Label as='a' color={color}>{tag.TagName}</Label>}
                                                        flowing
                                                        hoverable
                                                        inverted
                                                        size="mini"
                                                        style={{transform:"scale(0.8,0.8)",transformOrigin:"bottom left"}}
                                                    >
                                                        Click to add/remove tag
                                                    </Popup>
                                                )
                                            }
                                        }
                                    )}
                                </Segment>


                            </div>
                        </div>
                )
            }
        )}
    </div>
</div>
)



export default ChannelList;

