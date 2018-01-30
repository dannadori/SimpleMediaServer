import { Action } from 'redux';
import { Channel, Program } from '../reducers/reducer';
export declare const REFRESH_SCREEN = "REFRESH_SCREEN";
export declare const SHOW_PROGRAM = "SHOW_PROGRAM";
export declare const SHOW_CHANNEL = "SHOW_CHANNEL";
export declare const SHOW_VIDEO = "SHOW_VIDEO";
export declare const SHOW_SEARCH = "SHOW_SEARCH";
export declare const REFRESH_ALL = "REFRESH_ALL";
export declare const SHOW_KEYWORD_EDITOR = "SHOW_KEYWORD_EDITOR";
export interface RefreshScreenAction extends Action {
    type: string;
}
export interface ShowProgramAction extends Action {
    type: string;
}
export interface ShowChannelAction extends Action {
    type: string;
}
export interface ShowVideoAction extends Action {
    type: string;
}
export interface ShowSearchAction extends Action {
    type: string;
}
export interface RefreshAllAction extends Action {
    type: string;
}
export interface ShowKeywordEditorAction extends Action {
    type: string;
}
export declare function refresScreen(): RefreshScreenAction;
export declare function showProgram(): ShowProgramAction;
export declare function showChannel(): ShowChannelAction;
export declare function showVideo(): ShowVideoAction;
export declare function showSearch(): ShowSearchAction;
export declare function refreshAll(): RefreshAllAction;
export declare function showKeywordEditor(): ShowKeywordEditorAction;
export declare const TV_CHANNELS_EDIT = "TV_CHANNELS_EDIT";
export declare const TV_CHANNELS_EDIT_SUCCESS = "TV_CHANNELS_EDIT_SUCCESS";
export declare const TV_CHANNELS_EDIT_FAILED = "TV_CHANNELS_EDIT_FAILED";
export interface TVChannelsEditAction extends Action {
    type: string;
    id: number;
    channel: Channel;
}
export interface TVChannelsEditSuccessAction extends Action {
    type: string;
    id: number;
    channels: Channel[];
}
export interface TVChannelsEditFailedAction extends Action {
    type: string;
    id: number;
}
export declare function editTVChannels(c: Channel): TVChannelsEditAction;
export declare function editTVChannels_success(data: any): TVChannelsEditSuccessAction;
export declare function editTVChannels_failed(error: any): TVChannelsEditFailedAction;
export declare const RECORDER_TIMERS_TOGGLE = "RECORDER_TIMERS_TOGGLE";
export declare const RECORDER_TIMERS_TOGGLE_SUCCESS = "RECORDER_TIMERS_TOGGLE_SUCCESS";
export declare const RECORDER_TIMERS_TOGGLE_FAILED = "RECORDER_TIMERS_TOGGLE_FAILED";
export interface RecorderTimersToggleAction extends Action {
    type: string;
    id: number;
    programs: Program[];
    del: boolean;
}
export interface RecorderTimersToggleSuccessAction extends Action {
    type: string;
    id: number;
    programs: Program[];
}
export interface RecorderTimersToggleFailedAction extends Action {
    type: string;
    id: number;
}
export declare function toggleRecorderTimers(data: any, del: boolean): RecorderTimersToggleAction;
export declare function toggleRecorderTimers_success(data: any): RecorderTimersToggleSuccessAction;
export declare function toggleRecorderTimers_failed(error: any): RecorderTimersToggleFailedAction;
