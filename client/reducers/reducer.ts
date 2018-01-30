import { Action } from 'redux';
import {
  TV_CHANNELS_GET_SUCCESS,
  TVChannelsGetSuccessAction,
  // TV_CHANNELS_GET_FAILED,
  // TVChannelsGetFailedAction,

  TV_PROGRAMS_GET_SUCCESS,
  TVProgramsGetSuccessAction,
  // TV_PROGRAMS_GET_FAILED,
  // TVProgramsGetFailedAction,
  //TVProgramsUpdateSuccessAction,
    
  RECORDER_TIMERS_GET_SUCCESS,
  // RecorderTimersGetAction,
  // RECORDER_TIMERS_GET_FAILED,
  // RecorderTimersGetFailedAction,

  // RECORDER_TIMERS_POST_SUCCESS,
  // RecorderTimersPostAction,
  // RECORDER_TIMERS_POST_FAILED,
  // RecorderTimersPostFailedAction,

  // RECORDER_TIMERS_DELETE_SUCCESS,
  // RecorderTimersDeleteAction,
  // RECORDER_TIMERS_DELETE_FAILED,
  // RecorderTimersDeleteFailedAction,
  RecorderTimersGetSuccessAction,
  TAGS_GET_SUCCESS,
  TagsGetSuccessAction,
  TV_PROGRAMS_UPDATE_POST_SUCCESS,
  TV_PROGRAMS_UPDATE_GET_SUCCESS,
} from '../actions/app';



import { Channel } from '../reducers/reducer';
import { Program } from '../reducers/reducer';
import { SHOW_PROGRAM, SHOW_CHANNEL, SHOW_VIDEO, REFRESH_ALL, SHOW_SEARCH, SHOW_KEYWORD_EDITOR, REFRESH_SCREEN } from '../actions/app2';

export interface GlobalState {
  counter: number
  programUpdateState: string
  tvChannels: Channel[]
  recorderTimers: Program[]
  tvPrograms: Program[]
  tags: Tag[]
}

export const initialState = {
  counter: 0,
  programUpdateState: "not running",
  tvChannels: [],
  recorderTimers:[],
  tvPrograms: [],
  tags: [],
};


export interface Channel {
  ID: string;
  Tp: string;
  DisplayName: string;
  TransportStreamID: string;
  OriginalNetworkID: string;
  ServiceID: string;
  key: string;
  tags: string[];
  visible: boolean;
}

export interface Program {
  Channel: string;
  Title: string;
  Desc: string;
  Category: string[];
  Start: string;
  Stop: string;
  EventId: string;
  FileName: string;
  key: string;
}

export interface Tag{
  TagName: string;
  Category: string;
}


const reducer = (state: GlobalState=initialState, action: Action) => {
  var gs: GlobalState = Object.assign({},state)
  gs.counter++;
  switch (action.type) {
    case TV_CHANNELS_GET_SUCCESS:
      var action2:TVChannelsGetSuccessAction = <TVChannelsGetSuccessAction>action
      if(action2.channels!=null){
        gs.tvChannels=action2.channels
      }
      return gs;
    case TV_PROGRAMS_GET_SUCCESS:
      var action3:TVProgramsGetSuccessAction = <TVProgramsGetSuccessAction>action
      if(action3.programs!=null){
        gs.tvPrograms=action3.programs
      }
      return gs;
    case RECORDER_TIMERS_GET_SUCCESS:
      var action5:RecorderTimersGetSuccessAction = <RecorderTimersGetSuccessAction>action
      if(action5.programs!=null){
        gs.recorderTimers=action5.programs
      }
      return gs;

    case TAGS_GET_SUCCESS:
      var action6:TagsGetSuccessAction = <TagsGetSuccessAction>action
      if(action6.tags!=null){
        gs.tags=action6.tags
      }
      return gs;



    case TV_PROGRAMS_UPDATE_POST_SUCCESS:
      console.log("POST PROGRAM UPDATE REDUCER")
      return gs;

    case TV_PROGRAMS_UPDATE_GET_SUCCESS:
      console.log("GET PROGRAM UPDATE REDUCER")
      return gs;

    case REFRESH_SCREEN:
      return gs;

    case SHOW_PROGRAM:
      return gs;
    case SHOW_CHANNEL:
      return gs;
    case SHOW_VIDEO:
      return gs;
    case SHOW_SEARCH:
      return gs;
    case REFRESH_ALL:
      return gs;
    case SHOW_KEYWORD_EDITOR:
      return gs;
    
    
    default:
      return state;
  }
};

export default reducer;