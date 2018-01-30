import * as React from 'react';
//import {Channel} from '../reducers/reducer'
import {Grid, Segment, Label, Header, Popup, Icon, Input } from 'semantic-ui-react'
import {Tag} from '../reducers/reducer'

const KeywordEditor = (props: any )=>(
    <div>
        {
            (()=>{
//                this.open=false
                this.show = (cat:string) => {this.open=true;this.category=cat;props.onClick_refreshScreen()}
                this.close = () => {this.open=false;props.onClick_refreshScreen()}
                this.inputNewTag = (cat:string, word:string) => {
                    console.log("Cat:"+cat+"    "+word)
                    var tag:Tag={TagName:word, Category:cat}
                    props.onInputTags(tag)
                }
            })()
        }
        <Grid columns={1}>
            <Grid.Column>
                <Segment raised color="olive" >
                    <Header> Edit keywords</Header>
                    <Label as='a' color='red' ribbon>Tags for Channels</Label>
                    <Input
                        icon='tags'
                        iconPosition='left'
                        placeholder='Enter tags'
                        style={{transform:"scale(0.9,0.9)",transformOrigin:"bottom left"}}
                        onKeyUp={ (e:any) => {if(e.keyCode == 13) {this.inputNewTag("Tags For Channels",e.target.value);e.target.value="";}}}
                    />
                    <Segment raised>
                        {props.tags.map(
                            (tag:Tag)=>{
                                if(tag.Category == "Tags For Channels"){
                                    return (
                                        <Popup
                                            trigger={<Label as='a' color='orange'>{tag.TagName}</Label>}
                                            flowing
                                            hoverable
                                            inverted
                                            size="mini"
                                            style={{transform:"scale(0.8,0.8)",transformOrigin:"bottom left"}}
                                        >
                                            <div><Icon name='remove' size="mini" onClick={()=>{props.onClick_DeleteTags(tag)}}/></div>
                                        </Popup>
                                    )
                                }
                            }
                        )}
                    </Segment>

                    <Label as='a' color='blue' ribbon>Frequently used search word</Label>
                    <Input
                        icon='tags'
                        iconPosition='left'
                        placeholder='Enter tags'
                        style={{transform:"scale(0.9,0.9)",transformOrigin:"bottom left"}}
                        onKeyUp={ (e:any) => {if(e.keyCode == 13) {this.inputNewTag("Frequently used search word",e.target.value);e.target.value="";}}}
                    />
                    <Segment raised>
                        {props.tags.map(
                            (tag:Tag)=>{
                                if(tag.Category == "Frequently used search word"){
                                    return (
                                        <Popup
                                            trigger={<Label as='a' color='teal'>{tag.TagName}</Label>}
                                            flowing
                                            hoverable
                                            inverted
                                            size="mini"
                                            style={{transform:"scale(0.8,0.8)",transformOrigin:"bottom left"}}
                                        >
                                            <div><Icon name='remove' size="mini" onClick={()=>{props.onClick_DeleteTags(tag)}}/></div>
                                        </Popup>
                                    )
                                }
                            }
                        )}
                    </Segment>

                    <Label as='a' color='violet' ribbon>Auto Recorder</Label>
                    <Input
                        icon='tags'
                        iconPosition='left'
                        placeholder='Enter tags'
                        style={{transform:"scale(0.9,0.9)",transformOrigin:"bottom left"}}
                        onKeyUp={ (e:any) => {if(e.keyCode == 13) {this.inputNewTag("Auto Recorder",e.target.value);e.target.value="";}}}
                    />
                    <Segment raised>
                        {props.tags.map(
                            (tag:Tag)=>{
                                if(tag.Category == "Auto Recorder"){
                                    return (
                                        <Popup
                                            trigger={<Label as='a' color='purple'>{tag.TagName}</Label>}
                                            flowing
                                            hoverable
                                            inverted
                                            size="mini"
                                            style={{transform:"scale(0.8,0.8)",transformOrigin:"bottom left"}}
                                        >
                                        <div><Icon name='remove' size="mini" onClick={()=>{props.onClick_DeleteTags(tag)}}/></div>
                                        </Popup>
                                    )
                                }
                            }
                        )}
                    </Segment>


                </Segment>
            </Grid.Column>    
        </Grid>


    </div>
)



export default KeywordEditor;

