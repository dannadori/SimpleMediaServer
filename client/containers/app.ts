//import * as React from 'react';
import { Action } from 'redux';
import { connect, Dispatch } from 'react-redux'
import App from '../components/app'
import {getTVChannels, getTVPrograms, getTags, postTags, deleteTags, postTVProgramsUpdate, getTVProgramsUpdate} from '../actions/app'
import {getRecorderTimers} from '../actions/app'
import { GlobalState, Channel, Tag } from '../reducers/reducer';

import {toggleRecorderTimers, showProgram, showVideo, showChannel, showSearch, refreshAll, showKeywordEditor, refresScreen, editTVChannels} from '../actions/app2'


export interface Props {
}

function mapStateToProps(state:GlobalState) {
  console.log("mapStateToProps")
  console.log(state)
  return state
}

// clickでactionを飛ばず
function mapDispatchToProps(dispatch: Dispatch<GlobalState>) {
  return {
    onClick_refreshScreen: () => { dispatch(refresScreen()) },

    onClick_getTVChannels: () => { dispatch(getTVChannels()) },
    onClick_getTVPrograms: () => { dispatch(getTVPrograms()) },    
    onClick_getRecorderTimers: () => { dispatch(getRecorderTimers()) },

    onClick_toggleRecorderTimers: (ch:Channel, del:boolean) => { dispatch(toggleRecorderTimers(ch, del)) },

    onClick_showProgram: () => { dispatch(showProgram()) },
    onClick_showChannel: () => { dispatch(showChannel()) },
    onClick_showVideo: () => { dispatch(showVideo()) },
    onClick_showSearch: () => { dispatch(showSearch()) },
    onClick_refreshAll: () => { dispatch(getTVChannels()); dispatch(getTVPrograms()); 
                                  dispatch(getRecorderTimers()); dispatch(refreshAll());
                                  dispatch(getTags()); },
    onClick_postTVProgramsUpdate: () => { dispatch(postTVProgramsUpdate()) },
    onClick_getTVProgramsUpdate: () => { dispatch(getTVProgramsUpdate()) },
    onClick_showKeywordEditor: ()=> { dispatch(showKeywordEditor())},

    onInputTags: (tag:Tag)=>{dispatch(postTags(tag))},
    onClick_DeleteTags: (tag:Tag)=>(dispatch(deleteTags(tag))),

    updateChannelTags: (c:Channel)=>{dispatch(editTVChannels(c))},

    dispatch:(a:Action)=>{dispatch(a)},
  }
}

//connect関数でReduxとReactコンポーネントを繋ぐ
const SMS = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default SMS;
