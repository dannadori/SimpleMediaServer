import * as React from 'react';
import {Program} from '../reducers/reducer'
import { Button, Icon} from 'semantic-ui-react'



const VideoList = (props: any )=>(
<div>

    {
        (()=>{
            /*sort filtered programs*/
            props.recorderTimers.sort((a:Program,b:Program)=>{
                if(a.Start < b.Start) return -1
                if(a.Start > b.Start) return 1
                return 0;
            })
        })()

    }

    {
        props.recorderTimers.map(
            (pr:Program)=>{

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

                return (
                    <div className="ui olive message">
                        <div className="item">
                            <div className="content">
                                <a className="header">{pr.Title}</a>
                                <div className="meta">
                                    {startYear} {startMonth}/{startDay} {startHour}:{startMin} - {stopHour}:{stopMin}
                                </div>
                                <div className="description">
                                    {pr.Desc}
                                </div>
                                <div className="meta">
                                    {
                                        (()=>{
                                            if(pr.FileName!="" && pr.FileName!=undefined){
                                                var filePath="/video/"+pr.FileName
                                                return (
                                                    <div>
                                                        <Button.Group basic size='small'>
                                                            <Button icon labelPosition='left' onClick={()=>{window.open(filePath)}} >
                                                                <Icon name='download' />
                                                                Download
                                                            </Button>
                                                            <Button icon labelPosition='left' onClick={(e:any) => props.onClick_toggleRecorderTimers(pr, true )} >
                                                                <Icon name='trash' />
                                                                Delete
                                                            </Button>
                                                        </Button.Group>
                                                    </div>
                                                )
                                            }else{
                                                return (
                                                    <div>
                                                        <Button.Group basic size='small'>
                                                            <Button disabled icon labelPosition='left' >
                                                                <Icon name='download' />
                                                                Download
                                                            </Button>
                                                            <Button icon labelPosition='left' onClick={(e:any) => props.onClick_toggleRecorderTimers(pr, true )} >
                                                                <Icon name='trash' />
                                                                Delete
                                                            </Button>
                                                        </Button.Group>
                                                    </div>
                                                )
                                            }
                                        })()
                                    }
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



export default VideoList;

