import { Action } from 'redux';
import { Channel, Program } from '../reducers/reducer';

export const REFRESH_SCREEN = 'REFRESH_SCREEN';

export const SHOW_PROGRAM = 'SHOW_PROGRAM';
export const SHOW_CHANNEL = 'SHOW_CHANNEL';
export const SHOW_VIDEO = 'SHOW_VIDEO';
export const SHOW_SEARCH = 'SHOW_SEARCH';
export const REFRESH_ALL = 'REFRESH_ALL';
export const SHOW_KEYWORD_EDITOR = 'SHOW_KEYWORD_EDITOR';

export interface RefreshScreenAction extends Action {type: string;}

export interface ShowProgramAction extends Action {type: string;}
export interface ShowChannelAction extends Action {type: string;}
export interface ShowVideoAction extends Action {type: string;}
export interface ShowSearchAction extends Action {type: string;}
export interface RefreshAllAction extends Action {type: string;}
export interface ShowKeywordEditorAction extends Action {type: string;}


export function refresScreen(): RefreshScreenAction {
    return {type: REFRESH_SCREEN};
}

export function showProgram(): ShowProgramAction {
    return {type: SHOW_PROGRAM};
}
export function showChannel(): ShowChannelAction {
    return {type: SHOW_CHANNEL};
}
export function showVideo(): ShowVideoAction {
    return {type: SHOW_VIDEO};
}
export function showSearch(): ShowSearchAction {
    return {type: SHOW_SEARCH};
}
export function refreshAll(): RefreshAllAction {
    return {type: REFRESH_ALL};
}

export function showKeywordEditor(): ShowKeywordEditorAction {
    return {type: SHOW_KEYWORD_EDITOR};
}

/*
 * Toggle User Channels
 */

export const TV_CHANNELS_EDIT = 'TV_CHANNELS_EDIT';
export const TV_CHANNELS_EDIT_SUCCESS = 'TV_CHANNELS_EDIT_SUCCESS';
export const TV_CHANNELS_EDIT_FAILED = 'TV_CHANNELS_EDIT_FAILED';

export interface TVChannelsEditAction extends Action {
    type: string;
    id: number;
    channel: Channel;
}
export interface TVChannelsEditSuccessAction extends Action {
    type: string;
    id: number;
    channels: Channel[]
}
export interface TVChannelsEditFailedAction extends Action {
    type: string;
    id: number;
}
  

export function editTVChannels(c:Channel): TVChannelsEditAction {
    return {
      id: 0,
      type: TV_CHANNELS_EDIT,
      channel:c,
    };
}
export function editTVChannels_success(data:any): TVChannelsEditSuccessAction {
    return {
      id: 0,
      type: TV_CHANNELS_EDIT_SUCCESS,
      channels: data.Channels,
    };
}
export function editTVChannels_failed(error:any): TVChannelsEditFailedAction {
    return {
      id: 0,
      type: TV_CHANNELS_EDIT_FAILED,
    };
}





/*
 * Toggle RecorderTimer On/Off (Off may mean deletion)
 */

export const RECORDER_TIMERS_TOGGLE = 'RECORDER_TIMERS_TOGGLE';
export const RECORDER_TIMERS_TOGGLE_SUCCESS = 'RECORDER_TIMERS_TOGGLE_SUCCESS';
export const RECORDER_TIMERS_TOGGLE_FAILED = 'RECORDER_TIMERS_TOGGLE_FAILED';

export interface RecorderTimersToggleAction extends Action {
    type: string;
    id: number;
    programs: Program[]
    del: boolean
}
export interface RecorderTimersToggleSuccessAction extends Action {
    type: string;
    id: number;
    programs: Program[]
}
export interface RecorderTimersToggleFailedAction extends Action {
    type: string;
    id: number;
}
  

export function toggleRecorderTimers(data:any, del:boolean): RecorderTimersToggleAction {
    return {
      id: 0,
      type: RECORDER_TIMERS_TOGGLE,
      programs:data,
      del:del,
    };
}
export function toggleRecorderTimers_success(data:any): RecorderTimersToggleSuccessAction {
    return {
      id: 0,
      type: RECORDER_TIMERS_TOGGLE_SUCCESS,
      programs: data.Programs,
    };
}
export function toggleRecorderTimers_failed(error:any): RecorderTimersToggleFailedAction {
    return {
      id: 0,
      type: RECORDER_TIMERS_TOGGLE_FAILED,
    };
}


